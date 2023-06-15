import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStatusDto {

  @ApiProperty({ example: 700 })
  @IsNumber()
  readonly default: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  readonly recycle: number;
    
}
