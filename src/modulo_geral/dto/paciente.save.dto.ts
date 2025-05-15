import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PacienteSaveDto {
  @IsNotEmpty({ message: "nome deve ser preenchido" })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: "email deve ser preenchido" })
  @IsString()
  email: string;

  @IsNotEmpty({ message: "cpf deve ser preenchido" })
  @IsString()
  cpf: string;

  @IsOptional()
  telefone: string;

  @IsNotEmpty({ message: "senha deve ser preenchido" })
  @IsString()
  senha: string;
}
