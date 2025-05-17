import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    await this.validarEmailCpf(body);
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
        novoPaciente.tipoSanguineo = body.tipoSanguineo;

        return this.pacienteRepository.save(novoPaciente);
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return new PacienteInfoDto(novoPaciente);
  }

  private async validarEmailCpf(body: PacienteSaveDto, usuarioId?: string) {
    const validarEmail = await this.usuarioRepository.findOneByEmail(body.email);
    if (validarEmail) {
      if (!usuarioId) {
        throw new BadRequestException('Email já cadastrado');
      } else if (validarEmail.id !== usuarioId) {
        throw new BadRequestException('Email já cadastrado');
      }
    }
    const validarCpf = await this.usuarioRepository.findOneByCpf(this.removeSpecialCharacters(body.cpf));
    if (validarCpf) {
      if (!usuarioId) {
        throw new BadRequestException('Cpf já cadastrado');
      } else if (validarCpf.id !== usuarioId) {
        throw new BadRequestException('Cpf já cadastrado');
      }
    }
  }

  private mapUsuario(novoUsuario: UsuarioEntity, body: PacienteSaveDto, hashedPassword: string) {
    novoUsuario.cpf = this.removeSpecialCharacters(body.cpf);
    novoUsuario.email = body.email;
    novoUsuario.senha = hashedPassword;
  }

  async update(id: string, body: PacienteSaveDto): Promise<PacienteInfoDto> {
    let paciente = await this.pacienteRepository.findOneById(id);

    if (!paciente) {
      throw new NotFoundException("Paciente não encontrado");
    }

    if (paciente.usuario.email !== body.email || paciente.usuario.cpf !== body.cpf) {
      await this.validarEmailCpf(body, paciente.usuario.id);
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
          paciente.tipoSanguineo = body.tipoSanguineo;

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

  removeSpecialCharacters(str: string) {
    return str.replace(/[^\w\s]/gi, '');
  }
}