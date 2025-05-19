import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { PacienteInfoDto } from '../dto/paciente.info.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteRepository } from '../repositories/paciente.repository';
import { PacienteEntity } from '../entities/paciente.entity';
import { ConsultaSaveDto } from '../dto/consulta.save.dto';
import { ConsultaInfoDto } from '../dto/consulta.info.dto';
import { ConsultaRepository } from '../repositories/consulta.repository';
import { ProfissionalRepository } from '../repositories/profissional.repository';
import { ConsultaEntity } from '../entities/consulta.entity';

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

  private async verificarDataMarcada(body: ConsultaSaveDto) {
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
    const consultas = await this.consultaRepository.findMarcadasByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }

  async historico(cpf: string, id: string) {
    const consultas = await this.consultaRepository.findHistoricoByCpf(cpf);
    if (!id) {
      return consultas.map((consulta) => new ConsultaInfoDto(consulta));
    }
    return consultas.filter((consulta) => consulta.id == id);
  }
}