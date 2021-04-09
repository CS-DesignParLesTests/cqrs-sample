import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
  })
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    description: 'The author of the book',
  })
  @IsNotEmpty()
  author: string;
}
