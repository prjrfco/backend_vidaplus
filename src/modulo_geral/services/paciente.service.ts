import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { PacienteInfoDto } from '../dto/paciente.info.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteRepository } from '../repositories/paciente.repository';
import { PacienteEntity } from '../entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
      private readonly usuarioRepository: UsuarioRepository,
      private readonly pacienteRepository: PacienteRepository,
  ) {}

  async findAll(): Promise<PacienteInfoDto[]> {
    const pacientes = await this.pacienteRepository.findAll();
    return pacientes.map((paciente) => new PacienteInfoDto(paciente));
  }

  async findOneById(id: string): Promise<PacienteInfoDto> {
    const paciente = await this.pacienteRepository.findOneById(id);
    if (!paciente) {
      throw new NotFoundException("Paciente não encontrado");
    }
    return new PacienteInfoDto(paciente);
  }

  async save(body: PacienteSaveDto): Promise<PacienteInfoDto> {
    const hashedPassword = await bcrypt.hash(body.senha, 10);

    const novoUsuario = new UsuarioEntity();
    let novoPaciente = new PacienteEntity();
    this.mapUsuario(novoUsuario, body, hashedPassword);

    try {
      novoPaciente = await this.usuarioRepository.save(novoUsuario).then(() => {
        novoPaciente.usuario = novoUsuario;
        novoPaciente.nome = body.nome;
        novoPaciente.telefone = body.telefone;
        novoPaciente.pesoEmKg = body.pesoEmKg;
        novoPaciente.alturaEmMetro = body.alturaEmMetro;

        return this.pacienteRepository.save(novoPaciente);
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return new PacienteInfoDto(novoPaciente);
  }

  private mapUsuario(novoUsuario: UsuarioEntity, body: PacienteSaveDto, hashedPassword: string) {

  }

  async update(id: string, body: PacienteSaveDto): Promise<PacienteInfoDto> {
    let paciente = await this.pacienteRepository.findOneById(id);

    if (!paciente) {
      throw new NotFoundException("Paciente não encontrado");
    }

    const hashedPassword = await bcrypt.hash(body.senha, 10);

    this.mapUsuario(paciente.usuario, body, hashedPassword);

    try {
      return new PacienteInfoDto(
        await this.usuarioRepository.save(paciente.usuario).then((user) => {
          paciente.usuario = user;
          paciente.nome = body.nome;
          paciente.telefone = body.telefone;
          paciente.pesoEmKg = body.pesoEmKg;
          paciente.alturaEmMetro = body.alturaEmMetro;

          return this.pacienteRepository.save(paciente);
        })
      )
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string) {
    const paciente = await this.pacienteRepository.findOneById(id);

    if (!paciente) {
      throw new NotFoundException("Paciente não encontrado");
    }

    await this.pacienteRepository.softDelete(paciente);
  }

}