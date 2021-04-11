import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User Details')
@Controller('users')
@ApiExtraModels(User)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'A User object.',
    schema: { $ref: '#/components/schemas/User' },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A user with the specified username was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  async findOne(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of User objects.',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/User',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'There is no user.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: { $ref: '#/components/schemas/User' },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. User ID must be a string to uuid format.',
  })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A user with the specified username was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':username')
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A user with the specified username was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Authorization information is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'A user with the specified username was not found.' })
  @ApiResponse({ status: 500, description: 'Unexpected error.' })
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
