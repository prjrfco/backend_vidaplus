import { IsNotEmpty } from 'class-validator';

export class ConsultaPacienteUpdateDto {
  @IsNotEmpty({ message: "dataMarcada deve ser preenchido" })
  dataMarcada: Date;
}
