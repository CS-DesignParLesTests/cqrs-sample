import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookOwnershipDto {
  @ApiProperty()
  @IsNotEmpty()
  public bookId: string;

  @ApiPropertyOptional()
  @IsOptional()
  public isBought?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public isSigned?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public isLent?: boolean;

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
