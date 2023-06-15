import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDateDto {

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  readonly day: number;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  readonly month: number;

  @ApiProperty({ example: 2022 })
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;
    
}