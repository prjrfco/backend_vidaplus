import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';
import { PacienteService } from '../services/paciente.service';
import { PacienteSaveDto } from '../dto/paciente.save.dto';

@Controller("auth")
export class PublicController {
  constructor(private authService: AuthService,
              private service: PacienteService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.validarUsuario(body.email, body.senha);
  }

  @Post('cadastro')
  async cadastrar(@Body() body: PacienteSaveDto) {
    return this.service.save(body);
  }

}
