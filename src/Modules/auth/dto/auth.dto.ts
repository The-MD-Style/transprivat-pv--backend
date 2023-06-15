import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({ example: "transprivate@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "transprivate" })
  @IsString()
  password: string;
}
