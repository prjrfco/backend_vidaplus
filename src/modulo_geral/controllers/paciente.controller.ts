import { Body, Controller, Delete, Get, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteService } from '../services/paciente.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';

@UseGuards(AuthGuard)
@Controller("paciente")
export class PacienteController {
  constructor(private service: PacienteService, private authService: AuthService) {}

  @Get()
  async buscar(@Req() req: any) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.service.findOneByCpf(user.cpf);
  }

  @Put()
  async atualizar(@Req() req: any, @Body() body: PacienteSaveDto) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.service.update(user.cpf, body);
  }

  @Delete()
  async apagar(@Req() req: any) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.service.delete(user.cpf);
  }

  private validarPaciente(user: TokenUserDto) {
    if (user.tipo !== TipoUsuarioEnum.PACIENTE) {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
