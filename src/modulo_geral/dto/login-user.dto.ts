import {UsuarioEntity} from "../entities/usuario.entity";
import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';

export class LoginUserDTO {
  cpf: string;
  email: string;
  tipo: TipoUsuarioEnum;
  token: string;

  constructor(usuario: UsuarioEntity, token: string) {
    this.cpf = usuario.cpf;
    this.email = usuario.email;
    this.tipo = usuario.tipo;
    this.token = token;
  }
}
