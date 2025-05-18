import { BadRequestException, Injectable, Param, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioEntity } from '../entities/usuario.entity';
import { compare } from 'bcrypt';
import { TokenUserDto } from '../dto/token-user.dto';

@Injectable()
export class AuthService {
  constructor(
      private readonly usuarioRepository: UsuarioRepository,
      private jwtService: JwtService,
  ) {}
  async validarUsuario(emailOuCpf: string, senha: string): Promise<any> {
    let usuario: UsuarioEntity | null = await this.usuarioRepository.findOneByEmail(emailOuCpf);

    if (!usuario) {
      usuario = await this.usuarioRepository.findOneByCpf(this.removeSpecialCharacters(emailOuCpf));
      if (!usuario){
        throw new UnauthorizedException('Usuário ou Senha Inválidos');
      }
    }

    if (await compare(senha, usuario.senha)) {
      return await this.gerarToken(usuario);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: UsuarioEntity) {
    return {
      access_token: this.jwtService.sign(
          { cpf: payload.cpf, email: payload.email, tipo: payload.tipo },
          {
            secret: 'topSecret512',
            expiresIn: '7Days',
          },
      ),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: 'topSecret512',
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async tokenDecode(req: any) {
    let { authorization } = req.headers;
    authorization = authorization.split(" ")[1];
    const tokenDecoded: any = this.jwtService.decode(authorization);
    return new TokenUserDto(tokenDecoded);
  }

  removeSpecialCharacters(str: string) {
    return str.replace(/[^\w\s]/gi, '');
  }
}