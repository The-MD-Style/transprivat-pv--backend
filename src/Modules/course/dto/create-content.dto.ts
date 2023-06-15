import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContentDto {

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  readonly isList?: boolean;

  @ApiProperty({ example: [
    'Instruirea  şoferilor pentru conducerea mijloacelor de transport ce transportă  persoane în regim de taxi se va efectua în conformitate cu prevederile legislației naționale, internaționale și acestei programe.',
    'Şoferii vor acumula cunoştinţe şi deprinderi necesare în cadrul lecţiilor  prezentate în programa dată.',
    'Formarea iniţială, cît şi perfecţionarea se vor organiza sub forma unui curs de instruire care va cuprinde temele prezentate în această programă.',
    'Cursul va trata subiecte referitoare la legislaţia în transportul auto, regulile de circulaţie rutieră, comportarea şoferilor cu călătorii, comportarea şoferilor în caz de accidente, drepturile, obligaţiunile şi responsabilităţile pasagerilor, organizarea transporturilor de personae în regim de taxi pe rute neregulate, organizarea transportării şi păstrării bagajelor etc.',
    'Pentru obţinerea certificatului pentru transportarea persoanelor în regim de taxi, şoferul trebuie să parcurgă următoarele etape:',
  ]})
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  readonly text: string[];
    
}
