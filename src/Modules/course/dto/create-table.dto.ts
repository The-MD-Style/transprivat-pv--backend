import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

import { CreateStatusDto } from "./create-status.dto";
import { CreateTableRowDto } from "./create-tableRow.dto";

export class CreateTableDto {

  @ApiProperty({ example: 'Tematica şi repartizarea orelor pentru cursul specializat clasei Cisterne.' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: [
    'Tematica',
    'Pregătirea inițială (Numărul de ore)',
    'Pregătirea periodică (Numărul de ore)',
  ]})
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  readonly head?: string[];

  // @ApiProperty({ example: [
  //   [
  //     'Cerințe generale care reglementează transportarea de mărfuri periculoase. Introducere în reglementările din domeniu. Particularități naționale. Competență profesională. Documente de bord.',
  //     '2',
  //     '1',
  //   ],
  //   [
  //     'Tipurile principale de riscuri. Clasificarea mărfurilor periculoase.',
  //     '2',
  //     '1',
  //   ],
  //   [
  //     'Informația despre protecția mediului înconjurător la efectuarea controlului asupra transportului de deșeuri. Deșeuri de mărfuri periculoase. Reglementarea națională și internațională a transferului de deșeuri.',
  //     '2',
  //     '1',
  //   ],
  //   [
  //     'Măsuri preventive și măsuri pentru asigurarea securității la diferite tipuri de riscuri. Măsuri funcție de clasa de pericol sau diviziune. Diferențe funcție de starea de agregare: gaze, lichide, solide. Măsuri funcție de modul de ambalare. Unitățile de transport marfă supuse fumigației',
  //     '2',
  //     '1',
  //   ],
  // ]})
  // @IsString({ each: true })
  // @IsArray({ each: true })
  // @IsNotEmpty({ each: true })
  // readonly rows: string[][];
  
  @ApiProperty({ example: [
    [
      'Cerințe generale care reglementează transportarea de mărfuri periculoase. Introducere în reglementările din domeniu. Particularități naționale. Competență profesională. Documente de bord.',
      '2',
      '1',
    ],
    [
      'Tipurile principale de riscuri. Clasificarea mărfurilor periculoase.',
      '2',
      '1',
    ],
    [
      'Informația despre protecția mediului înconjurător la efectuarea controlului asupra transportului de deșeuri. Deșeuri de mărfuri periculoase. Reglementarea națională și internațională a transferului de deșeuri.',
      '2',
      '1',
    ],
    [
      'Măsuri preventive și măsuri pentru asigurarea securității la diferite tipuri de riscuri. Măsuri funcție de clasa de pericol sau diviziune. Diferențe funcție de starea de agregare: gaze, lichide, solide. Măsuri funcție de modul de ambalare. Unitățile de transport marfă supuse fumigației',
      '2',
      '1',
    ],
  ]})
  @ValidateNested({each:true})
  @Type(() => CreateTableRowDto)
  readonly rows: CreateTableRowDto[];

  @ApiProperty({ example: { 
    default: 12, 
    recycle: 8 
  }})
  @Type(() => CreateStatusDto)
  @ValidateNested()
  readonly footer: CreateStatusDto;

}