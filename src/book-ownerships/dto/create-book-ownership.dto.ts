import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookOwnershipDto {
  @ApiProperty()
  @IsNotEmpty()
  public bookId: string;

  @ApiPropertyOptional()
  @IsOptional()
  public bought?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public signed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public lent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public dateAcquired?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public dateRead?: Date;
}