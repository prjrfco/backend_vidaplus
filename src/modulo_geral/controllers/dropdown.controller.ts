import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { DropdownService } from '../services/dropdown.service';

@UseGuards(AuthGuard)
@Controller("dropdown")
export class DropdownController {
  constructor(private service: DropdownService) {}

  @Get('estados')
  async listarEstados() {
    return this.service.listarEstados();
  }

  @Get('cidades')
  async listarCidades(@Query('estado') estado: string) {
    if (!estado) {
      throw new BadRequestException('estado é obrigatório')
    }
    return this.service.listarCidades(estado);
  }

  @Get('unidade-hospitalar')
  async buscarUnidadeHospitalar(@Query('estado') estado: string,
                                @Query('cidade') cidade: string,) {
    if (!estado) {
      throw new BadRequestException('estado é obrigatório')
    }
    if (!cidade) {
      throw new BadRequestException('cidade é obrigatório')
    }
    return this.service.buscarUnidadeHospitalar(estado, cidade);
  }

  @Get('especialidades')
  async listarEspecialidade(@Query('unidadeHospitalarId') unidadeHospitalarId: string) {
    if (!unidadeHospitalarId) {
      throw new BadRequestException('unidadeHospitalarId é obrigatório')
    }
    return this.service.listarEspecialidadesByUnidadeHospitalar(unidadeHospitalarId);
  }

  @Get('profissional')
  async listarProfissional(@Query('unidadeHospitalarId') unidadeHospitalarId: string,
                           @Query('especialidadeId') especialidadeId: string) {
    if (!unidadeHospitalarId) {
      throw new BadRequestException('unidadeHospitalarId é obrigatório')
    }
    if (!especialidadeId) {
      throw new BadRequestException('especialidadeId é obrigatório')
    }
    return this.service.listarProfissional(unidadeHospitalarId, especialidadeId);
  }

}
