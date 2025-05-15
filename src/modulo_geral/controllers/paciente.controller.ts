import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { PacienteSaveDto } from '../dto/paciente.save.dto';

@Controller("paciente")
export class PacienteController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  async listar() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return this.usuarioService.findOneById(id);
  }

  @Post()
  async cadastrar(@Body() body: PacienteSaveDto) {
    return this.usuarioService.save(body);
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() body: PacienteSaveDto) {
    return this.usuarioService.update(id, body);
  }

  @Delete(':id')
  async apagar(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }

}
