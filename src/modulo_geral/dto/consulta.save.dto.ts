import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { TipoConsultaEnum } from '../../common/enums/tipo.consulta.enum';

export class ConsultaSaveDto {
  @IsNotEmpty({ message: "profissionalId deve ser preenchido" })
  @IsString()
  profissionalId: string;

  @IsNotEmpty({ message: "dataMarcada deve ser preenchido" })
  dataMarcada: Date;

  @IsIn(Object.keys(TipoConsultaEnum), {
    message: "O campo 'tipo' aceita apenas os valores: " + Object.keys(TipoConsultaEnum),
  })
  @IsNotEmpty({ message: "tipo deve ser preenchido" })
  tipo: TipoConsultaEnum;
}
