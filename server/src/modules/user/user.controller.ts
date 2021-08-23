import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getUsers() {
    const users = await this.userService.getUsers();

    return {
      message: 'Users fetched',
      data: { users },
    };
  }
}
