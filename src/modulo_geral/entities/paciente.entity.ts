import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../common/base.entity';
import { UsuarioEntity } from './usuario.entity';
import { ConsultaEntity } from './consulta.entity';

@Entity({ name: "paciente", schema: "cadastro" })
export class PacienteEntity extends Base {

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.id)
  @JoinColumn({ name: "usuario_id", referencedColumnName: "id" })
  usuario: UsuarioEntity;

  @Column({ name: "nome", nullable: false, type: "varchar" })
  nome: string;

  @Column({ name: "telefone", nullable: true, type: "varchar" })
  telefone: string;

  @Column("decimal", {
    name: "peso_kg",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  pesoEmKg: number;

  @Column("decimal", {
    name: "altura_m",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  alturaEmMetro: number;

  @Column({ name: "tipo_sanguineo", nullable: true, type: "varchar" })
  tipoSanguineo: string;

  @OneToMany(() => ConsultaEntity, (consulta) => consulta.paciente)
  consultas: ConsultaEntity[];
}
