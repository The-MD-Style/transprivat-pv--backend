
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

import { CreateSectionDataDto } from "./create-sectionData.dto";
import { CreateStatusDto } from "./create-status.dto";
import { CreateTableDto } from "./create-table.dto";
import { CreateDateDto } from "./create-date.dto";
import { CreateCardDto } from "./create-card.dto";

export class CreateCourseDto {

	@ApiProperty({ example: 'ADR - mixt' })
  @IsNotEmpty()
  @IsString()
  readonly tab: string;
	
	@ApiProperty({ example: 'Conducător auto pentru transportul de mărfuri periculoase (ADR-mixt)' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: { 
    default: 1200, 
    recycle: 1000 
  }})
  @ValidateNested()
  @Type(() => CreateStatusDto)
  readonly price: CreateStatusDto;
  
  @ApiProperty({ example: { 
    default: 1200, 
    recycle: 1000 
  }})
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateStatusDto)
  readonly internationalPrice?: CreateStatusDto;

  @ApiProperty({ example: [
    'Pregătirea conducătorilor auto responsabili de transportare a persoanelor în regim de taxi prevede respectării cerințelor prevederilor legislației naționale și internaționale din domeniu și corespunderii normelor și standardelor de securitate a circulației rutiere și a protecției ecologice.',
    'Conducătorii auto conduc autovehicole cu persoane la comandă, care reprezintă un risc major în caz de accident rutier.',
  ]})
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  readonly description: string[];

  @ApiProperty({ example: ['Romănă', 'Rusă'] })
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  readonly lang: string[];
    
	@ApiProperty({ example: 'Popa Vadim' })
  @IsNotEmpty()
  @IsString()
  readonly createdBy: string;

	@ApiProperty({ example: {
    day: 22,
    month: 6,
    year: 2021,
  }})
  @ValidateNested()
  @Type(() => CreateDateDto)
  readonly date: CreateDateDto;

	@ApiProperty({example: {
    default: 30,
    recycle: 18,
  }})
  @ValidateNested()
  @Type(() => CreateStatusDto)
  readonly duration: CreateStatusDto;

	@ApiProperty({ example: [
    {
      title: 'Condiții obligatorii',
      requirements: [
        'vechimea în muncă cel puţin 3 ani ca conducător auto',
        'să dispună de permis de conducere cu categoria respectivă.',
      ],
    },
  ]})
  @ValidateNested({ each: true })
  @Type(() => CreateCardDto)
  readonly card: CreateCardDto[];

	@ApiProperty({ example: [
    {
      title: 'Competențele profesionale',
      content: [
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
      ],
    },
  ]})
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDataDto)
  readonly courseSections: CreateSectionDataDto[];

	@ApiProperty({ example: [
    {
      head: [
        'Tematica',
        'Pregătirea inițială (Numărul de ore)',
        'Pregătirea periodică (Numărul de ore)',
      ],
      rows: [
        {
          row:[
            'Cerințe generale care reglementează transportarea de mărfuri periculoase. Introducere în reglementările din domeniu. Particularități naționale. Competență profesională. Documente de bord.',
            '2',
            '1',
          ]
        },
        {
          row:[
            'Tipurile principale de riscuri. Clasificarea mărfurilor periculoase.',
            '2',
            '1',
          ]
        },
        {
          row:[
            'Informația despre protecția mediului înconjurător la efectuarea controlului asupra transportului de deșeuri. Deșeuri de mărfuri periculoase. Reglementarea națională și internațională a transferului de deșeuri.',
            '2',
            '1',
          ]
        },
        {
          row:[
          'Măsuri preventive și măsuri pentru asigurarea securității la diferite tipuri de riscuri. Măsuri funcție de clasa de pericol sau diviziune. Diferențe funcție de starea de agregare: gaze, lichide, solide. Măsuri funcție de modul de ambalare. Unitățile de transport marfă supuse fumigației',
          '2',
          '1',
          ]
        },
      ],
      footer: { default: 12, recycle: 8 },
    }
  ]})
  @ValidateNested({ each: true })
  @Type(() => CreateTableDto)
  readonly tables: CreateTableDto[];

}
