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
      where: [{ dataHoraMarcada: Between(dataInicial, dataFinal) }, { dataHoraMarcadaFinal: Between(dataInicial, dataFinal) }]
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
      relations: { paciente: true, profissional: { especialidade: true }, unidadeHospitalar: true },
      where: [
        { paciente: { usuario: { cpf: cpf } }, realizada: true, cancelada: false },
        { paciente: { usuario: { cpf: cpf } }, realizada: false, cancelada: true }
      ],
    })
  }
}