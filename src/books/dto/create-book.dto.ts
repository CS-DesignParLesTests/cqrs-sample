import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    required: true,
    description: 'The title of the book',
    type: 'string',
  })
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    required: true,
    description: 'The author of the book',
    type: 'string',
  })
  @IsNotEmpty()
  author: string;
}
