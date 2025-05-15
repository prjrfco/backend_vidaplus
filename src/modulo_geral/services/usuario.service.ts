import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { PacienteInfoDto } from '../dto/paciente.info.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import * as bcrypt from "bcrypt";
import { PacienteSaveDto } from '../dto/paciente.save.dto';

@Injectable()
export class UsuarioService {
  constructor(
      private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async findAll(): Promise<PacienteInfoDto[]> {
    const usuarios = await this.usuarioRepository.findAll();
    return usuarios.map((usuario) => new PacienteInfoDto(usuario));
  }

  async findOneById(id: string): Promise<PacienteInfoDto> {
    const usuario = await this.usuarioRepository.findOneById(id);
    if (!usuario) {
      throw new NotFoundException("Usuario não encontrado");
    }
    return new PacienteInfoDto(usuario);
  }

  async save(body: PacienteSaveDto): Promise<PacienteInfoDto> {
    const hashedPassword = await bcrypt.hash(body.senha, 10);

    const novoUsuario = new UsuarioEntity();
    novoUsuario.nome = body.nome;
    novoUsuario.email = body.email;
    novoUsuario.cpf = body.cpf;
    novoUsuario.telefone = body.telefone;
    novoUsuario.senha = hashedPassword;

    const result = await this.usuarioRepository.save(novoUsuario);

    return new PacienteInfoDto(result);
  }

  async update(id: string, body: PacienteSaveDto): Promise<PacienteInfoDto> {
    const usuario = await this.usuarioRepository.findOneById(id);

    if (!usuario) {
      throw new NotFoundException("Usuario não encontrado");
    }

    const hashedPassword = await bcrypt.hash(body.senha, 10);

    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.cpf = body.cpf;
    usuario.telefone = body.telefone;
    usuario.senha = hashedPassword;

    const result = await this.usuarioRepository.save(usuario);

    return new PacienteInfoDto(result);
  }

  async delete(id: string) {
    const usuario = await this.usuarioRepository.findOneById(id);

    if (!usuario) {
      throw new NotFoundException("Usuario não encontrado");
    }

    await this.usuarioRepository.softDelete(usuario);
  }

}