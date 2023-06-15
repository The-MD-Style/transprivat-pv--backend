import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { CreateContentDto } from "./create-content.dto";

export class CreateSectionDataDto {

  @ApiProperty({ example: 'Competențele profesionale' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  
  @ApiProperty({ example: [
    {
      text: [
        'Instruirea  şoferilor pentru conducerea mijloacelor de transport ce transportă  persoane în regim de taxi se va efectua în conformitate cu prevederile legislației naționale, internaționale și acestei programe.',
        'Şoferii vor acumula cunoştinţe şi deprinderi necesare în cadrul lecţiilor  prezentate în programa dată.',
        'Formarea iniţială, cît şi perfecţionarea se vor organiza sub forma unui curs de instruire care va cuprinde temele prezentate în această programă.',
        'Cursul va trata subiecte referitoare la legislaţia în transportul auto, regulile de circulaţie rutieră, comportarea şoferilor cu călătorii, comportarea şoferilor în caz de accidente, drepturile, obligaţiunile şi responsabilităţile pasagerilor, organizarea transporturilor de personae în regim de taxi pe rute neregulate, organizarea transportării şi păstrării bagajelor etc.',
        'Pentru obţinerea certificatului pentru transportarea persoanelor în regim de taxi, şoferul trebuie să parcurgă următoarele etape:',
      ],
    },
    {
      isList: true,
      text: [
        'să frecventeze, sau cu frecvență redusă, cursul de instruire şi perfecţionare.',
      ],
    },
    {
      text: [
        'Durata totală a cursului auto cuprinzător este stabilită în volum de 30 ore.',
        'Durata unei lecţii va constitui 45 minute.',
        'Zilnic se va permite de a ţine cel mult opt ore academice.',
        'După absolvirea cursului şoferii vor susţine examene pe marginea cursului. Examenul se va efectua prin metoda de testare în scris conform testelor. Se va considera că candidatul a susţinut examenul cu succes,  dacă corect  a rezolvat cel puţin 75% din întrebările evaluate în test.',
      ],
    },
  ]})
  @ValidateNested({ each: true })
  @Type(() => CreateContentDto)
  readonly content: CreateContentDto[];

}