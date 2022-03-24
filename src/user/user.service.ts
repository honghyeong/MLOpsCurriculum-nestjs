import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from 'src';
import { User } from './user.entity';
import { find } from 'rxjs';
// import { User } from './user.model';

@Injectable()
export class UserService {
  /**
   * DB : mem, typeorm repository
   */
  userRepository = AppDataSource.getRepository(User);

  // private users: User[] = [];
  /**
   * 1. Get users
   */
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // findAllUsers(): User[] {
  //   return this.users;
  // }

  /**
   * 2. Get a user
   */

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  // findUser(id: string): User {
  //   const found = this.users.find((u) => u.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find user with id ${id}`);
  //   }
  //   return found;
  // }
  /**
   * 3. Create a user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, age } = createUserDto;
    const newUser = new User();
    newUser.age = age;
    newUser.name = name;
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }
  // createUser(createUserDto: CreateUserDto): User {
  //   const { name, age } = createUserDto;
  //   const newUser: User = {
  //     id: randomUUID(),
  //     name,
  //     age,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  /**
   * 4. Update a user
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ id });
    const { name, age } = updateUserDto;
    findUser.age = age;
    findUser.name = name;
    return await this.userRepository.save(findUser);
  }
  // updateUser(id: string, updateUserDTO: UpdateUserDto): User {
  //   const { name, age } = updateUserDTO;
  //   const user = this.findUser(id);
  //   user.name = name;
  //   user.age = age;
  //   return user;
  // }
  /**
   * 5. Delete a user
   */

  async deleteUser(id: number): Promise<User> {
    const findUser = await this.userRepository.findOneBy({ id });
    return await this.userRepository.remove(findUser);
  }
  // deleteUser(id: string): User {
  //   const found = this.findUser(id);
  //   this.users = this.users.filter((user) => user.id !== found.id);
  //   return found;
  // }
}
