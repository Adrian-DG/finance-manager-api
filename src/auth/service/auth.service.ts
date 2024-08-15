import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { LoginUser } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/service/user.service';
import { AuthenticatedResponse } from '../dto/authenticated-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _users: UserService,
    private readonly _jwt: JwtService,
  ) {}

  async singIn(username: string, password: string) {
    const foundUser = await this._users.findOneBy(username);
    if (foundUser?.password != password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };
    const token = await this._jwt.signAsync(payload);
    return { access_token: token } as AuthenticatedResponse;
  }

  async signUp(model: CreateUser) {
    const user = await this._users.create(model);
    return user;
  }
}
