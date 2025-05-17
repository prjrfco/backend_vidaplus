import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { ProfissionalEntity } from './profissional.entity';

@Entity({ name: "especialidade", schema: "cadastro" })
export class EspecialidadeEntity extends Base {
  @Column({ name: "nome", nullable: false, type: "varchar" })
  nome: string;

  @OneToMany(() => ProfissionalEntity, (profissional) => profissional.especialidade)
  profissionais: ProfissionalEntity[];
}
