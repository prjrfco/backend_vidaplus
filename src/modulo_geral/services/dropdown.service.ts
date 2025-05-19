import { Injectable, NotFoundException } from '@nestjs/common';
import { UnidadeHospitalarRepository } from '../repositories/unidade-hospitalar.repository';
import { UnidadeHospitalarInfoDto } from '../dto/unidade-hospitalar.info.dto';
import { EspecialidadeEntity } from '../entities/especialidade.entity';
import { ProfissionalEntity } from '../entities/profissional.entity';

@Injectable()
export class DropdownService {
  constructor(
      private readonly repository: UnidadeHospitalarRepository,
  ) {}

  async listarEstados() {
    const unidadesHospitalares = await this.repository.findAll();
    const estados: string[] = [];

    for (const unidade of unidadesHospitalares) {
      if (!estados.includes(unidade.estado)) {
        estados.push(unidade.estado)
      }
    }

    return estados;
  }

  async listarCidades(estado: string) {
    const unidadesHospitalares = await this.repository.findAllByEstado(estado);
    const cidades: string[] = [];

    for (const unidade of unidadesHospitalares) {
      if (!cidades.includes(unidade.cidade)) {
        cidades.push(unidade.cidade)
      }
    }

    return cidades;
  }

  async buscarUnidadeHospitalar(estado: string, cidade: string) {
    const unidades = await this.repository.findAllByEstadoCidade(estado, cidade);

    return unidades.map((unidade) => new UnidadeHospitalarInfoDto(unidade));
  }

  async listarEspecialidadesByUnidadeHospitalar(unidadeHospitalarId: string) {
    const unidadeHospitalar = await this.repository.findOneById(unidadeHospitalarId);
    const controle: string[] = [];
    const especialidades: EspecialidadeEntity[] = [];

    if (!unidadeHospitalar) {
      throw new NotFoundException("Unidade Hospitalar não encontrada")
    }

    for (const profissional of unidadeHospitalar.profissionais) {
      if (!controle.includes(profissional.especialidade.nome)) {
        controle.push(profissional.especialidade.nome);
        especialidades.push(profissional.especialidade);
      }
    }

    return especialidades.map((especialidade) => { return { id: especialidade.id, nome: especialidade.nome } });
  }

  async listarProfissional(unidadeHospitalarId: string, especialidadeId: string) {
    const unidadeHospitalar = await this.repository.findOneById(unidadeHospitalarId);

    if (!unidadeHospitalar) {
      throw new NotFoundException("Unidade Hospitalar não encontrada")
    }

    const profissionais: ProfissionalEntity[] = unidadeHospitalar.profissionais.filter((profissional) => profissional.especialidade.id == especialidadeId);

    return profissionais.map((profissional) => { return { id: profissional.id, nome: profissional.nome, especialildade: profissional.especialidade.nome } });
  }
}