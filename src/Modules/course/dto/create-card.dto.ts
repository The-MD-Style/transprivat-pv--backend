import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {

  @ApiProperty({ example: 'Condiții obligatorii' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: [
    'vechimea în muncă cel puţin 3 ani ca conducător auto',
    'să dispună de permis de conducere cu categoria respectivă.',
  ]})
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  readonly requirements: string[];

}