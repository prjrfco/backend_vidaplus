import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../common/base.entity';
import { ProfissionalEntity } from './profissional.entity';
import { ConsultaEntity } from './consulta.entity';

@Entity({ name: "unidade_hospitalar", schema: "cadastro" })
export class UnidadeHospitalarEntity extends Base {

  @Column({ name: "nome", nullable: false, type: "varchar" })
  nome: string;

  @Column({ name: "cep", nullable: false, type: "varchar" })
  cep: string;

  @Column({ name: "estado", nullable: false, type: "varchar" })
  estado: string;

  @Column({ name: "cidade", nullable: false, type: "varchar" })
  cidade: string;

  @Column({ name: "rua", nullable: false, type: "varchar" })
  rua: string;

  @Column({ name: "bairro", nullable: false, type: "varchar" })
  bairro: string;

  @Column({ name: "numero", nullable: false, type: "varchar" })
  numero: string;

  @OneToMany(() => ProfissionalEntity, (profissional) => profissional.unidadeHospitalar)
  profissionais: ProfissionalEntity[];

  @OneToMany(() => ConsultaEntity, (consulta) => consulta.unidadeHospitalar)
  consultas: ConsultaEntity[];
}
