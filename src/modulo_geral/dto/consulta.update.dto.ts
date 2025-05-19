import { IsNotEmpty } from 'class-validator';

export class ConsultaUpdateDto {
  @IsNotEmpty({ message: "dataMarcada deve ser preenchido" })
  dataMarcada: Date;
}
