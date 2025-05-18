import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../common/base.entity';
import { UsuarioEntity } from './usuario.entity';
import { UnidadeHospitalarEntity } from './unidade-hospitalar.entity';
import { EspecialidadeEntity } from './especialidade.entity';
import { PacienteEntity } from './paciente.entity';
import { ProfissionalEntity } from './profissional.entity';
import { TipoConsultaEnum } from '../../common/enums/tipo.consulta.enum';

@Entity({ name: "consulta", schema: "cadastro" })
export class ConsultaEntity extends Base {

  @ManyToOne(() => PacienteEntity, (paciente) => paciente.id)
  @JoinColumn({ name: "paciente_id", referencedColumnName: "id" })
  paciente: PacienteEntity;

  @ManyToOne(() => ProfissionalEntity, (profissional) => profissional.id)
  @JoinColumn({ name: "profissional_id", referencedColumnName: "id" })
  profissional: ProfissionalEntity;

  @ManyToOne(() => UnidadeHospitalarEntity, (unidadeHospitalar) => unidadeHospitalar.id)
  @JoinColumn({ name: "unidade_hospitalar_id", referencedColumnName: "id" })
  unidadeHospitalar: UnidadeHospitalarEntity;

  @Column({ name: "data_marcada", nullable: false, type: "timestamp" })
  dataMarcada: Date;

  @Column({ name: "realizada", nullable: false, type: "boolean", default: false })
  realizada: boolean;

  @Column({ name: "cancelada", nullable: false, type: "boolean", default: false })
  cancelada: boolean;

  @Column({ name: "tipo", nullable: true, type: "varchar", default: TipoConsultaEnum.PRESENCIAL })
  tipo: TipoConsultaEnum;

  @Column({ name: "observacoes", nullable: true, type: "text"})
  observacoes: string;
}
