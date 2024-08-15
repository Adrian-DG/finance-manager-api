import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { LoginUser } from 'src/user/dto/login-user.dto';
import { Public } from '../strategy/public-access.strategy';
import { AuthenticatedResponse } from '../dto/authenticated-response.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly _auth: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In user to app' })
  @ApiResponse({
    status: 200,
    description: 'User created successfully',
    type: [AuthenticatedResponse],
  })
  async signIn(@Body() signInDto: LoginUser) {
    const result = await this._auth.singIn(
      signInDto.username,
      signInDto.password,
    );
    return result;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated correctly',
    type: [User],
  })
  async signUp(@Body() signUpDto: CreateUser) {
    const payload = {
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
      createdAt: new Date(),
    };

    const result = await this._auth.signUp(payload);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('is-authenticated')
  validateAuthentication(@Request() req) {
    return req?.user;
  }
}
