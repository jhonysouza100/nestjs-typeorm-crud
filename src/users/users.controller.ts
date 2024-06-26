import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/:id')
  createprofile(@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto) {
    return this.usersService.createProfile(id, profile)
  }

  @Post('/')
  createone(@Body() user: CreateUserDto) {
    return this.usersService.createOne(user)
  }
 

  @Get('/')
  getAll() {
    return this.usersService.findAll()
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeOne(id)
  }

  @Put('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.updateOne(id, user)
  }
}
