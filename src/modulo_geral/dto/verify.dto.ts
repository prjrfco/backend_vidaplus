import { IsNotEmpty, IsString } from "class-validator";

export class VerifyDTO {
  @IsNotEmpty({ message: "VerifyDTO_passwordNotEmpty" })
  @IsString()
  token: string;
}
