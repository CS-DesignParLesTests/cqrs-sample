import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['username'] as const)) {
  @ApiProperty({
    required: true,
  })
  @IsString()
  displayName: string;
}
