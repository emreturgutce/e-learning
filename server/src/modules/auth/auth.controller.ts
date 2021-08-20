import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Session as SessionDoc } from 'express-session';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

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

    this.logger.log(`User logged in [${user._id}]`);

    return {
      message: 'Logged in',
      data: { user },
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);

    this.logger.log(`User created [${user._id}]`);

    return {
      message: 'User created',
      data: { user },
    };
  }

  @Get('csrf')
  @HttpCode(HttpStatus.OK)
  public getCsrfToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('csrf', req.csrfToken());

    this.logger.log('Csrf token created');

    return {
      message: 'Csrf token set to cookie',
      data: {},
    };
  }
}
