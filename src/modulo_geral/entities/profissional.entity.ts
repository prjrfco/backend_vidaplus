import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../common/base.entity';
import { UsuarioEntity } from './usuario.entity';
import { UnidadeHospitalarEntity } from './unidade-hospitalar.entity';
import { EspecialidadeEntity } from './especialidade.entity';
import { ConsultaEntity } from './consulta.entity';

@Entity({ name: "profissional", schema: "cadastro" })
export class ProfissionalEntity extends Base {

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.id)
  @JoinColumn({ name: "usuario_id", referencedColumnName: "id" })
  usuario: UsuarioEntity;

  @ManyToOne(() => UnidadeHospitalarEntity, (unidadeHospitalar) => unidadeHospitalar.id)
  @JoinColumn({ name: "unidade_hospitalar_id", referencedColumnName: "id" })
  unidadeHospitalar: UnidadeHospitalarEntity;

  @ManyToOne(() => EspecialidadeEntity, (especialidade) => especialidade.id)
  @JoinColumn({ name: "especialidade_id", referencedColumnName: "id" })
  especialidade: EspecialidadeEntity;

  @Column({ name: "nome", nullable: false, type: "varchar" })
  nome: string;

  @Column({ name: "telefone", nullable: true, type: "varchar" })
  telefone: string;

  @OneToMany(() => ConsultaEntity, (consulta) => consulta.profissional)
  consultas: ConsultaEntity[];
}
