import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { LoginUser } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/service/user.service';
import { AuthenticatedResponse } from '../dto/authenticated-response.dto';
import * as security from '../helpers/security.helper';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _users: UserService,
    private readonly _jwt: JwtService,
  ) {}

  async signUp(model: CreateUser) {
    const usernameHash = await security.hash(model.username);

    if (await this._users.confirmUserExists(usernameHash)) {
      throw new BadRequestException('User already exists!!');
    }

    const encryptedUsername = await security.encrypt(model.username);
    const encryptedEmail = await security.encrypt(model.email);
    const newPasswordHash = await security.hash(model.password);

    const user = await this._users.create({
      username: encryptedUsername,
      email: encryptedEmail,
      password: newPasswordHash,
    });

    return { ...model, password: '' };
  }

  async singIn(username: string, password: string) {
    const usernameHash = await security.hash(username);

    const foundUser = await this._users.findOne(usernameHash);

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (!(await compare(password, foundUser.password))) {
      throw new BadRequestException('Incorrect credentials');
    }

    const decryptedUsername = await security.decrypt(foundUser.username);

    const payload = { sub: foundUser.id, username: decryptedUsername };
    const token = await this._jwt.signAsync(payload);

    return { access_token: token } as AuthenticatedResponse;
  }
}
