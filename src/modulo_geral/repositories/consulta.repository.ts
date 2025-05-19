import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ConsultaEntity } from '../entities/consulta.entity';

@Injectable()
export class ConsultaRepository {
  constructor(
      @InjectRepository(ConsultaEntity)
      private readonly consultaRepository: Repository<ConsultaEntity>,
  ) {}

  save(entity: ConsultaEntity): Promise<ConsultaEntity> {
    return this.consultaRepository.save(entity);
  }

  findByPeriod(dataInicial: Date, dataFinal:Date): Promise<ConsultaEntity[]> {
    return this.consultaRepository.find({
      where: [
        { dataHoraMarcada: Between(dataInicial, dataFinal), cancelada: false },
        { dataHoraMarcadaFinal: Between(dataInicial, dataFinal), cancelada: false }
      ]
      }
    )
  }

  async findMarcadasByCpf(cpf: string) {
    return this.consultaRepository.find({
      relations: { paciente: { usuario: true }, profissional: { especialidade: true }, unidadeHospitalar: true },
      where: { paciente: { usuario: { cpf: cpf } }, realizada: false, cancelada: false },
    })
  }

  async findHistoricoByCpf(cpf: string) {
    return this.consultaRepository.find({
      relations: { paciente: { usuario: true }, profissional: { especialidade: true }, unidadeHospitalar: true },
      where: [
        { paciente: { usuario: { cpf: cpf } }, realizada: true, cancelada: false },
        { paciente: { usuario: { cpf: cpf } }, realizada: false, cancelada: true }
      ],
    })
  }

  async findByIdMarcada(cpf: string, id: string) {
    return this.consultaRepository.findOne({
      relations: { paciente: { usuario: true }, profissional: { especialidade: true }, unidadeHospitalar: true },
      where: { id: id, paciente: { usuario: { cpf: cpf } },realizada: false, cancelada: false },
    })
  }
}