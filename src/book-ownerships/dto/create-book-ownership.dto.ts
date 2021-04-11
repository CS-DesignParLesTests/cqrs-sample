import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookOwnershipDto {
  @ApiProperty({
    required: true,
    description: 'The unique ID of the book',
    type: 'string',
    format: 'uuid',
  })
  @IsNotEmpty()
  public bookId: string;

  @ApiPropertyOptional({
    description: 'Indicates whether the book has been bought or not by the user',
    type: 'boolean',
  })
  @IsOptional()
  @IsNotEmpty()
  public isBought?: boolean;

  @ApiPropertyOptional({
    description: `Indicates whether the user's book has been signed or not`,
    type: 'boolean',
  })
  @IsOptional()
  @IsNotEmpty()
  public isSigned?: boolean;

  @ApiPropertyOptional({
    description: `Indicates whether the user's book is lent or not`,
    type: 'boolean',
  })
  @IsOptional()
  @IsNotEmpty()
  public isLent?: boolean;

  @ApiPropertyOptional({
    description: `Indicates the acquisition date of the book by the user`,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public dateAcquired?: Date;

  @ApiPropertyOptional({
    description: `Indicates the reading date of the book by the user`,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public dateRead?: Date;
}
