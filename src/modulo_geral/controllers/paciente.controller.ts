import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PacienteSaveDto } from '../dto/paciente.save.dto';
import { PacienteService } from '../services/paciente.service';

@Controller("paciente")
export class PacienteController {
  constructor(private service: PacienteService) {}

  @Get()
  async listar() {
    return this.service.findAll();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @Post()
  async cadastrar(@Body() body: PacienteSaveDto) {
    return this.service.save(body);
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() body: PacienteSaveDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async apagar(@Param('id') id: string) {
    return this.service.delete(id);
  }

}
