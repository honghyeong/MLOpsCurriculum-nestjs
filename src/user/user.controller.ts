import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
// import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  /**
   * 1. Get Users
   */

  @Get('/')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
  // @Get('/')
  // findAllUsers(): User[] {
  //   return this.userService.findAllUsers();
  // }
  /**
   * 2. Get a User
   */
  @Get('/:id')
  findUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUser(id);
  }
  // @Get('/:id')
  // findUser(@Param('id') id: string): User {
  //   return this.userService.findUser(id);
  // }
  /**
   * 3. Create a User
   */
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  // @Post('/')
  // createUser(@Body() createUserDto: CreateUserDto): User {
  //   return this.userService.createUser(createUserDto);
  // }

  /**
   * 4. Update a user
   */
  @Put('/:id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  // @Put('/:id')
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): User {
  //   return this.userService.updateUser(id, updateUserDto);
  // }
  /**
   * 5. Delete a user
   */

  @Delete('/:id')
  deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  // @Delete('/:id')
  // deleteUser(@Param('id') id: string): User {
  //   return this.userService.deleteUser(id);
  // }
}
