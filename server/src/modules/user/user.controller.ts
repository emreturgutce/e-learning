import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Session,
  Post,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Session as SessionDoc } from 'express-session';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { SendMessageDto } from './dto/send-message.dto';
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

  @Get('/getCart')
  @HttpCode(HttpStatus.OK)
  public async getCart(@Session() session: SessionDoc) {
    const { id: userId } = session.context;

    const { cart } = await this.userService.getCart(userId);

    return {
      message: 'Cart fetched',
      data: { cart },
    };
  }

  @Post('/addCourseToCart/:courseId')
  @HttpCode(HttpStatus.CREATED)
  public async addCourseToCart(
    @Session() session: SessionDoc,
    @Param('courseId') courseId: string,
  ) {
    const { id: userId } = session.context;

    const { cart } = await this.userService.addCourseToCart(userId, courseId);

    return {
      message: 'Course added to cart',
      data: { cart },
    };
  }

  @Delete('/removeFromCart/:courseId')
  @HttpCode(HttpStatus.CREATED)
  public async removeFromCart(
    @Session() session: SessionDoc,
    @Param('courseId') courseId: string,
  ) {
    const { id: userId } = session.context;

    const { cart } = await this.userService.removeFromCart(userId, courseId);

    return {
      message: 'Course removed from cart',
      data: { cart },
    };
  }

  @Get('/getWishlist')
  @HttpCode(HttpStatus.OK)
  public async getWishlist(@Session() session: SessionDoc) {
    const { id: userId } = session.context;

    const { wishlist } = await this.userService.getWishlist(userId);

    return {
      message: 'Wishlist fetched',
      data: { wishlist },
    };
  }

  @Post('/addCourseToWishlist/:courseId')
  @HttpCode(HttpStatus.CREATED)
  public async addCourseToWishlist(
    @Session() session: SessionDoc,
    @Param('courseId') courseId: string,
  ) {
    const { id: userId } = session.context;

    const { wishlist } = await this.userService.addCourseToWishlist(
      userId,
      courseId,
    );

    return {
      message: 'Course added to wishlist',
      data: { wishlist },
    };
  }

  @Delete('/removeFromWishlist/:courseId')
  @HttpCode(HttpStatus.CREATED)
  public async removeFromWishlist(
    @Session() session: SessionDoc,
    @Param('courseId') courseId: string,
  ) {
    const { id: userId } = session.context;

    const { wishlist } = await this.userService.removeFromWishlist(
      userId,
      courseId,
    );

    return {
      message: 'Course removed from wishlist',
      data: { wishlist },
    };
  }

  @Post('/send-message')
  @HttpCode(HttpStatus.OK)
  public async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @Session() session: SessionDoc,
  ) {
    await this.userService.sendMessage({
      ...sendMessageDto,
      sender: session.context.id,
    });

    return {
      message: 'Message sent',
      data: {},
    };
  }

  @Get('/get-messages/:chatId')
  @HttpCode(HttpStatus.OK)
  public async getMessages(@Param('chatId') chatId: string) {
    const chat = await this.userService.getMessages(chatId);

    return {
      message: 'Messages fetched',
      data: { chat },
    };
  }
}
