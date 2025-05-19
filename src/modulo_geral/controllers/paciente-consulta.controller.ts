import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteService } from '../services/paciente.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaSaveDto } from '../dto/consulta.save.dto';
import { ConsultaUpdateDto } from '../dto/consulta.update.dto';
import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';

@UseGuards(AuthGuard)
@Controller("paciente/consulta")
export class PacienteConsultaController {
  constructor(private consultaService: ConsultaService,
              private authService: AuthService) {}

  @Get()
  async listarMarcadas(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.consultaService.listarMarcadas(user.cpf, id);
  }

  @Get('historico')
  async historico(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.consultaService.historico(user.cpf, id);
  }

  @Post()
  async marcar(@Req() req: any, @Body() body: ConsultaSaveDto) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.consultaService.marcar(user.cpf, body);
  }

  @Put(':id')
  async remarcar(@Req() req: any, @Body() body: ConsultaUpdateDto, @Param('id') id: string,) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.consultaService.remarcar(user.cpf, body, id);
  }

  @Patch('cancelar/:id')
  async cancelar(@Param('id') id: string, @Req() req: any) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    this.validarPaciente(user);
    return this.consultaService.cancelar(user.cpf, id);
  }

  private validarPaciente(user: TokenUserDto) {
    if (user.tipo !== TipoUsuarioEnum.PACIENTE) {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
