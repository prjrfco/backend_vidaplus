import { Body, Controller, Get, Param, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { ConsultaService } from '../services/consulta.service';
import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';
import { ConsultaProfissionalUpdateDto } from '../dto/consulta-profissional.update.dto';

@UseGuards(AuthGuard)
@Controller("profissional/consulta")
export class ProfissionalConsultaController {
  constructor(private consultaService: ConsultaService,
              private authService: AuthService) {}

  @Get()
  async listarMarcadas(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarProfissional(user);
    return this.consultaService.listarMarcadasProfissional(user.cpf, id);
  }

  @Get('historico')
  async historico(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarProfissional(user);
    return this.consultaService.historicoProfissional(user.cpf, id);
  }

  @Put(':id')
  async remarcar(@Req() req: any, @Body() body: ConsultaProfissionalUpdateDto, @Param('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarProfissional(user);
    return this.consultaService.remarcarProfissional(user.cpf, body, id);
  }

  private validarProfissional(user: TokenUserDto) {
    if (user.tipo !== TipoUsuarioEnum.PROFISSIONAL) {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
