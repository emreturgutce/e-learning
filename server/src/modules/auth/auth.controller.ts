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
  Logger, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Session as SessionDoc } from 'express-session';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import {AuthGuard} from "../../common/guard/auth.guard";

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

    this.logger.log(
      `User logged in [userId: ${user._id}]`,
      AuthController.name,
    );

    return {
      message: 'Logged in',
      data: { user },
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);

    this.logger.log(`User created [userId: ${user._id}]`, AuthController.name);

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
    const csrfToken = req.csrfToken();

    res.cookie('csrf', csrfToken);

    this.logger.log('Csrf token created', AuthController.name);

    return {
      message: 'Csrf token set to cookie',
      data: {
        csrf: csrfToken,
      },
    };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async me(@Session() session: SessionDoc) {
    return {
      message: 'Logged in',
      data: { user: session.context },
    };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Session() session: SessionDoc,
    @Res({ passthrough: true }) res: Response,
  ) {
    session.context = null;

    session.destroy(null);

    res.clearCookie('session_token');

    return {
      message: 'Logged in',
      data: { user: session.context },
    };
  }
}
