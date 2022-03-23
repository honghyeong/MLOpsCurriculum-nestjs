import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAllUsers(): User[] {
    return this.users;
  }

  findUser(id: string): User {
    const found = this.users.find((u) => u.id === id);
    if (!found) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }
    return found;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { name, age } = createUserDto;
    const newUser: User = {
      id: randomUUID(),
      name,
      age,
    };

    this.users.push(newUser);
    return newUser;
  }
  updateUser(id: string, updateUserDTO: UpdateUserDto): User {
    const { name, age } = updateUserDTO;
    const user = this.findUser(id);
    user.name = name;
    user.age = age;
    return user;
  }

  deleteUser(id: string): User {
    const found = this.findUser(id);
    this.users = this.users.filter((user) => user.id !== found.id);
    return found;
  }
}
