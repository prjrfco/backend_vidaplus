import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfissionalEntity } from '../entities/profissional.entity';

@Injectable()
export class ProfissionalRepository {
  constructor(
      @InjectRepository(ProfissionalEntity)
      private readonly profissionalRepository: Repository<ProfissionalEntity>,
  ) {}

  save(entity: ProfissionalEntity): Promise<ProfissionalEntity> {
    return this.profissionalRepository.save(entity);
  }

  findById(id: string): Promise<ProfissionalEntity> {
    // @ts-ignore
    return this.profissionalRepository.findOne({
      relations: { unidadeHospitalar: true, especialidade: true },
      where: { id: id }
      }
    )
  }
}