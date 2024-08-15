import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { emit } from 'process';
import { CreateUser } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _users: Repository<User>,
  ) {}

  async findOneBy(username: string) {
    return this._users.findOneBy({ username });
  }

  async create(createUserDto: CreateUser) {
    return this._users.save(createUserDto);
  }
}
