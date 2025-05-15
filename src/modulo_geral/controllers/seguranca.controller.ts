import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from '../dto/login.dto';

@Controller("auth")
export class SegurancaController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.validarUsuario(body.email, body.senha);
  }

}
