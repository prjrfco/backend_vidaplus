import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PacienteEntity } from '../entities/paciente.entity';

@Injectable()
export class PacienteRepository {
  constructor(
      @InjectRepository(PacienteEntity)
      private readonly pacienteRepository: Repository<PacienteEntity>,
  ) {}

   findOneByEmail(email: string): Promise<PacienteEntity | null> {
    return this.pacienteRepository.findOne({
      relations: { usuario: true },
      where: { usuario: { email: email } } });
  }

  findOneByCpf(cpf: string): Promise<PacienteEntity | null> {
    return this.pacienteRepository.findOne({
      relations: { usuario: true },
      where: { usuario: { cpf: cpf } } });
  }

  findAll(): Promise<PacienteEntity[]> {
    return this.pacienteRepository.find({
      relations: { usuario: true },
      where: { apagadoEm: IsNull() } });
  }

  findOneById(id: string): Promise<PacienteEntity | null> {
    return this.pacienteRepository.findOne({
      relations: { usuario: true },
      where: { id: id, apagadoEm: IsNull() } });
  }

  save(entity: PacienteEntity): Promise<PacienteEntity> {
    return this.pacienteRepository.save(entity);
  }

  softDelete(entity: PacienteEntity) {
    return this.pacienteRepository.softRemove(entity);
  }

}