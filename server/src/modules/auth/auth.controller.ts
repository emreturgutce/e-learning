import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Session,
} from '@nestjs/common';
import { Session as SessionDoc } from 'express-session';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: SessionDoc,
  ) {
    const user = await this.authService.login(loginUserDto);

    session.context = {
      id: user._id,
      email: user.email,
      type: user.type,
    };

    return {
      message: 'Logged in',
      data: { user },
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);

    return {
      message: 'User created',
      data: { user },
    };
  }

  @Get('posts')
  @UseGuards(AuthGuard)
  public getPosts() {
    return {
      message: 'Posts fetched',
      data: { posts: [] },
    };
  }
}
