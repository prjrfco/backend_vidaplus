
import { PacienteEntity } from '../entities/paciente.entity';

export class PacienteInfoDto {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  pesoEmKg: number;
  alturaEmMetro: number;
  tipoSanguineo: string;
  dataCadastro: Date;
  dataUltimaAtualizacao: Date;

  constructor(entity: PacienteEntity) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.email = entity.usuario.email;
    this.cpf = entity.usuario.cpf;
    this.telefone = entity.telefone;
    this.pesoEmKg = entity.pesoEmKg;
    this.alturaEmMetro = entity.alturaEmMetro;
    this.tipoSanguineo = entity.tipoSanguineo;
    this.dataCadastro = entity.criadoEm;
    this.dataUltimaAtualizacao = entity.atualizadoEm;
  }
}
