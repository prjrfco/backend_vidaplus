import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';

export class TokenUserDto {
  cpf: string;
  email: string;
  tipo: TipoUsuarioEnum;

  constructor(token: any) {
    this.cpf = token.cpf;
    this.email = token.email;
    this.tipo = token.tipo;
  }
}
