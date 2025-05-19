import { ProfissionalEntity } from '../entities/profissional.entity';

export class ProfissionalInfoDto {
  id: string;
  nome: string;
  especialidade: string;

  constructor(entity: ProfissionalEntity) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.especialidade = entity.especialidade.nome;
  }
}
