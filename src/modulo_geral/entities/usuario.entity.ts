import { Column, Entity, Index } from 'typeorm';
import { Base } from '../../common/base.entity';
import { TipoUsuarioEnum } from '../../common/enums/tipo.usuario.enum';

@Entity({ name: "usuario", schema: "seguranca" })
@Index(["cpf"], { unique: true })
@Index(["email"], { unique: true })
export class UsuarioEntity extends Base {
  @Column({ name: "email", nullable: true, type: "varchar" })
  email: string;

  @Column({ name: "cpf", nullable: true, type: "varchar" })
  cpf: string;

  @Column({ name: "senha", nullable: true, type: "varchar" })
  senha: string;

  @Column({ name: "tipo", nullable: true, type: "varchar", default: TipoUsuarioEnum.PACIENTE })
  tipo: TipoUsuarioEnum;
}
