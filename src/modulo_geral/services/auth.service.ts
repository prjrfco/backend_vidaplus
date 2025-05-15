import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsuarioRepository} from "../repositories/usuario.repository";
import {UsuarioEntity} from "../entities/usuario.entity";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
      private readonly usersService: UsuarioRepository,
      private jwtService: JwtService,
  ) {}
  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario: UsuarioEntity | null = await this.usersService.findOneByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    if (await compare(senha, usuario.senha)) {
      return await this.gerarToken(usuario);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: UsuarioEntity) {
    return {
      access_token: this.jwtService.sign(
          { email: payload.email },
          {
            secret: 'topSecret512',
            expiresIn: '7Days',
          },
      ),
    };
  }
}