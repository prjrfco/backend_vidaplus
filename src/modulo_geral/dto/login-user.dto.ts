import {UsuarioEntity} from "../entities/usuario.entity";

export class LoginUserDTO {
  cpf: string;
  email: string;
  token: string;

  constructor(usuario: UsuarioEntity, token: string) {
    this.cpf = usuario.cpf;
    this.email = usuario.email;
    this.token = token;
  }
}
