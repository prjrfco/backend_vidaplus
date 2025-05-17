import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
      @InjectRepository(UsuarioEntity)
      private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

   findOneByEmail(email: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { email: email } });
  }

  findOneByCpf(cpf: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { cpf: cpf } });
  }

  findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find({ where: { apagadoEm: IsNull() } });
  }

  findOneById(id: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { id: id, apagadoEm: IsNull() } });
  }

  save(entity: UsuarioEntity): Promise<UsuarioEntity> {
    return this.usuarioRepository.save(entity);
  }

  softDelete(entity: UsuarioEntity) {
    return this.usuarioRepository.softRemove(entity);
  }

}