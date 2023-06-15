import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateTableRowDto {

  @ApiProperty({ example: {
    row:[
      'Cerințe generale care reglementează transportarea de mărfuri periculoase. Introducere în reglementările din domeniu. Particularități naționale. Competență profesională. Documente de bord.',
      '2',
      '1'
    ]
  }})
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  readonly row: string[];

}