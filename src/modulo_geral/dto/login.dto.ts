import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsNotEmpty({ message: "Email deve ser preenchido" })
  @IsString()
  login: string;

  @IsNotEmpty({ message: "Senha deve ser preenchido" })
  @IsString()
  senha: string;
}
