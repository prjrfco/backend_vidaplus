import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PacienteRepository } from '../repositories/paciente.repository';
import { ConsultaSaveDto } from '../dto/consulta.save.dto';
import { ConsultaInfoDto } from '../dto/consulta.info.dto';
import { ConsultaRepository } from '../repositories/consulta.repository';
import { ProfissionalRepository } from '../repositories/profissional.repository';
import { ConsultaEntity } from '../entities/consulta.entity';
import { ConsultaPacienteUpdateDto } from '../dto/consulta-paciente.update.dto';
import { ConsultaProfissionalUpdateDto } from '../dto/consulta-profissional.update.dto';

@Injectable()
export class ConsultaService {
  constructor(
      private readonly consultaRepository: ConsultaRepository,
      private readonly pacienteRepository: PacienteRepository,
      private readonly profissionalRepository: ProfissionalRepository,
  ) {}

  async marcar(cpf: string, body: ConsultaSaveDto): Promise<ConsultaInfoDto> {
    const dataHoraMarcadaFinal = await this.verificarDataMarcada(body);

    const profissional = await this.profissionalRepository.findById(body.profissionalId);
    if (!profissional) {
      throw new NotFoundException("Profissional não encontrado");
    }

    const paciente = await this.pacienteRepository.findOneByCpf(cpf)
    if (!paciente){
      throw new NotFoundException("Paciente não encontrado");
    }

    let novaConsulta = new ConsultaEntity();
    novaConsulta.dataHoraMarcada = body.dataMarcada;
    novaConsulta.profissional = profissional;
    novaConsulta.unidadeHospitalar = profissional.unidadeHospitalar;
    novaConsulta.paciente = paciente;
    novaConsulta.tipo = body.tipo;
    novaConsulta.dataHoraMarcadaFinal = dataHoraMarcadaFinal;

    novaConsulta = await this.consultaRepository.save(novaConsulta);
    return new ConsultaInfoDto(novaConsulta);
  }

  private async verificarDataMarcada(body: any) {
    if (body.dataMarcada <= new Date()) {
      throw new BadRequestException('Não é possível marcar uma consulta no passado');
    }
    const dataFinal: Date = new Date(new Date(body.dataMarcada).getTime() + (15 * 60 * 1000));
    const consultasConflitantesExistentes = await this.consultaRepository.findByPeriod(body.dataMarcada, dataFinal);

    if (consultasConflitantesExistentes.length > 0) {
      throw new BadRequestException('Já existe uma consulta marcada neste horário');
    }
    return dataFinal;
  }

  async listarMarcadas(cpf: string, id: string) {
    const consultas = await this.consultaRepository.findMarcadasPacienteByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }

  async historico(cpf: string, id: string) {
    const consultas = await this.consultaRepository.findHistoricoPacienteByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }

  async cancelar(cpf: string, id: string) {
    const consulta = await this.consultaRepository.findByIdMarcadaPaciente(cpf, id);
    if (!consulta){
      throw new NotFoundException("Consulta não encontrada")
    }

    consulta.cancelada = true;

    return new ConsultaInfoDto(await this.consultaRepository.save(consulta));
  }

  async remarcar(cpf: string, body: ConsultaPacienteUpdateDto, id: string) {
    const consulta = await this.consultaRepository.findByIdMarcadaPaciente(cpf, id);
    if (!consulta) {
      throw new NotFoundException("Consulta não encontrada")
    }

    const dataHoraMarcadaFinal = await this.verificarDataMarcada(body);
    consulta.dataHoraMarcada = body.dataMarcada;
    consulta.dataHoraMarcadaFinal = dataHoraMarcadaFinal;

    return new ConsultaInfoDto(await this.consultaRepository.save(consulta));
  }

  async listarMarcadasProfissional(cpf: string, id: string) {
    const consultas = await this.consultaRepository.findMarcadasProfissionalByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }

  async historicoProfissional(cpf: string, id: string) {
    const consultas = await this.consultaRepository.findHistoricoProfissionalByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }

  async remarcarProfissional(cpf: string, body: ConsultaProfissionalUpdateDto, id: string) {
    const consulta = await this.consultaRepository.findByIdMarcadaProfissional(cpf, id);
    if (!consulta) {
      throw new NotFoundException("Consulta não encontrada")
    }

    const dataHoraMarcadaFinal = await this.verificarDataMarcada(body);
    consulta.dataHoraMarcada = body.dataMarcada;
    consulta.dataHoraMarcadaFinal = dataHoraMarcadaFinal;
    consulta.observacoes = body.observacoes;

    return new ConsultaInfoDto(await this.consultaRepository.save(consulta));
  }
}