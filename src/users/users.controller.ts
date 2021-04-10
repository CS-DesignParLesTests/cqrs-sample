import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Details')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }

  /* TODO : Update

    @Patch(':username')
    update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(username, updateUserDto);
    }
   */

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
