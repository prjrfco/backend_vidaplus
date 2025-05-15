import {UsuarioEntity} from "../entities/usuario.entity";

export class LoginUserDTO {
  nome: string;
  email: string;
  token: string;

  constructor(usuario: UsuarioEntity, token: string) {
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.token = token;
  }
}
