import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFileUploadDto {

  @ApiProperty({ example: 'transprivate.jpg' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

}