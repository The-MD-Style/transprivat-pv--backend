import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "nume" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "prenume" })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: "aripartex@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "aripartex" })
  @IsString()
  @IsNotEmpty()
  password: string;

  refreshToken: string;
}
