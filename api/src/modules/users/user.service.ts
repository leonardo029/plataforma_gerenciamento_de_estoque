import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllUserResource } from './resources';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

  async create(createUserDto: CreateUserDto): Promise<void> {}

  async findAll(): Promise<FindAllUserResource[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new FindAllUserResource(user));
  }
}
