import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post('/')
  // @UsePipes(new CustomValidationPipe())
  createUser(
    @Body(new CustomValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new CustomValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
