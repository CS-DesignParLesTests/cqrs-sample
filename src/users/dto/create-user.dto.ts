import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The ID of a user',
    type: 'string',
    format: 'uuid',
  })
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({
    description: 'The name displayed to other users',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  displayName?: string;
}
