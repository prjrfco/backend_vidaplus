import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadeHospitalarEntity } from '../entities/unidade-hospitalar.entity';

@Injectable()
export class UnidadeHospitalarRepository {
  constructor(
      @InjectRepository(UnidadeHospitalarEntity)
      private readonly repository: Repository<UnidadeHospitalarEntity>,
  ) {}

   findAll(): Promise<UnidadeHospitalarEntity[]> {
    return this.repository.find();
  }

  findAllByEstado(estado: string): Promise<UnidadeHospitalarEntity[]> {
    return this.repository.find({
      where: { estado: estado },
    });
  }

  findAllByEstadoCidade(estado: string, cidade: string) {
    return this.repository.find({
      where: { estado: estado, cidade: cidade },
    });
  }

  async findOneById(unidadeHospitalarId: string) {
    return this.repository.findOne({
      relations: { profissionais: { especialidade: true, usuario: true } },
      where: { id: unidadeHospitalarId },
    });
  }
}