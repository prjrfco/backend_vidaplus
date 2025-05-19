import { IsNotEmpty, IsString } from 'class-validator';

export class ConsultaProfissionalUpdateDto {
  @IsNotEmpty({ message: "dataMarcada deve ser preenchido" })
  dataMarcada: Date;

  @IsNotEmpty({ message: "observacoes deve ser preenchido" })
  @IsString()
  observacoes: string;
}
