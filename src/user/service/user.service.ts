import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Like, Repository } from 'typeorm';
import { emit } from 'process';
import { CreateUser } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _users: Repository<User>,
  ) {}

  async confirmUserExists(usernameHash: string): Promise<boolean> {
    return await this._users.exists({
      where: {
        username: Like(`${usernameHash}|%`),
      },
    });
  }

  async findOne(usernameHash: string) {
    return this._users.findOne({
      where: {
        username: Like(`${usernameHash}|%`),
      },
    });
  }

  async create(createUserDto: CreateUser) {
    return this._users.save(createUserDto);
  }
}
