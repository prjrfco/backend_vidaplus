import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteService } from '../services/paciente.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenUserDto } from '../dto/token-user.dto';

@UseGuards(AuthGuard)
@Controller("paciente")
export class PacienteController {
  constructor(private service: PacienteService, private authService: AuthService) {}

  @Get()
  async buscar(@Req() req: any) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.service.findOneByCpf(user.cpf);
  }

  @Put()
  async atualizar(@Req() req: any, @Body() body: PacienteSaveDto) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.service.update(user.cpf, body);
  }

  @Delete()
  async apagar(@Req() req: any) {
    const user:TokenUserDto = await this.authService.tokenDecode(req);
    return this.service.delete(user.cpf);
  }
}
