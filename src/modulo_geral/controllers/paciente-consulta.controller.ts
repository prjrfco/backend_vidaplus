import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteService } from '../services/paciente.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenUserDto } from '../dto/token-user.dto';
import { ConsultaService } from '../services/consulta.service';
import { ConsultaSaveDto } from '../dto/consulta.save.dto';

@UseGuards(AuthGuard)
@Controller("paciente/consulta")
export class PacienteConsultaController {
  constructor(private consultaService: ConsultaService,
              private authService: AuthService) {}

  @Get()
  async listarMarcadas(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.consultaService.listarMarcadas(user.cpf, id);
  }

  @Get('historico')
  async historico(@Req() req: any, @Query('id') id: string) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.consultaService.historico(user.cpf, id);
  }

  @Post()
  async marcar(@Req() req: any, @Body() body: ConsultaSaveDto) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.consultaService.marcar(user.cpf, body);
  }

  // @Put(':id')
  // async remarcar(@Req() req: any, @Body() body: PacienteSaveDto) {
  //   const user:TokenUserDto = await this.authService.tokenDecode(req);
  //   return this.consultaService.remarcar(user.cpf, body);
  // }
  //
  // @Put(':id')
  // async cancelar(@Req() req: any) {
  //   const user:TokenUserDto = await this.authService.tokenDecode(req);
  //   return this.consultaService.cancelar(user.cpf);
  // }
}
