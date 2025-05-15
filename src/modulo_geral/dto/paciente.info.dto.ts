import { UsuarioEntity } from '../entities/usuario.entity';

export class PacienteInfoDto {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;

  constructor(entity: UsuarioEntity) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.email = entity.email;
    this.cpf = entity.cpf;
    this.telefone = entity.telefone;
  }
}
