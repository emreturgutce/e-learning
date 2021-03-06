/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Chat, ChatDocument } from './schema/chat.schema';
import { Message, MessageDocument } from './schema/message.schema';
import { User, UserDocument } from './schema/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    @InjectModel(Chat.name)
    private readonly ChatModel: Model<ChatDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const isExist = await this.getUserByEmail(createUserDto.email);

    if (isExist) {
      throw new BadRequestException(
        `User with the given email already exists [email: ${createUserDto.email}]`,
      );
    }

    const user = await this.UserModel.create(createUserDto);

    return user;
  }

  public getUsers(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }

  public getUserByEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email }).exec();
  }

  public findUserById(id: string): Promise<UserDocument> {
    return this.UserModel.findById(id).exec();
  }

  public comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  public async isPurchasedCourse(userId: string, courseId: string) {
    const user = await this.UserModel.findOne({
      $and: [
        {
          _id: userId,
        },
        {
          courses: { $in: [courseId] },
        },
      ],
    }).exec();

    return !!user;
  }

  public async registerCourse(userId: string, courseId: string) {
    return this.UserModel.findByIdAndUpdate(userId, {
      $push: { courses: courseId },
    }).exec();
  }

  public async refundCourse(userId: string, courseId: string) {
    return this.UserModel.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    }).exec();
  }

  public async listPurchasedCourses(userId: string) {
    return this.UserModel.findById(userId)
      .populate({
        path: 'courses',
        select: 'title description thumbnail',
        populate: {
          path: 'instructor',
          select: 'firstname lastname -_id',
        },
      })
      .select('courses -_id')
      .exec();
  }

  public async getCart(userId: string) {
    return this.UserModel.findById(userId)
      .populate({
        path: 'cart',
        select: 'title description thumbnail price total_students reviews',
        populate: {
          path: 'instructor',
          select: 'firstname lastname _id',
        },
      })
      .populate({
        path: 'cart',
        select: 'title description thumbnail price total_students reviews',
        populate: {
          path: 'reviews',
          select: '_id rating',
        },
      })
      .select('cart -_id')
      .exec();
  }

  public async addCourseToCart(userId: string, courseId: string) {
    const user = await this.UserModel.findById(userId);

    const hasCourse = user.courses.some(
      (course) => course.toString() === courseId,
    );
    const hasInCart = user.cart.some(
      (course) => course.toString() === courseId,
    );

    if (hasCourse || hasInCart) {
      throw new HttpException('Cannot add to cart.', HttpStatus.BAD_REQUEST);
    }

    return this.UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { cart: courseId },
      },
      { new: true },
    )
      .select('cart')
      .exec();
  }

  public async removeFromCart(userId: string, courseId: string) {
    return this.UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: courseId },
      },
      { new: true },
    )
      .select('cart')
      .exec();
  }

  public async getWishlist(userId: string) {
    return this.UserModel.findById(userId)
      .populate({
        path: 'wishlist',
        select: 'title description thumbnail',
        populate: {
          path: 'instructor',
          select: 'firstname lastname _id',
        },
      })
      .select('wishlist')
      .exec();
  }

  public async addCourseToWishlist(userId: string, courseId: string) {
    const user = await this.UserModel.findById(userId);

    const hasCourse = user.courses.some(
      (course) => course.toString() === courseId,
    );
    const hasInWishlist = user.wishlist.some(
      (course) => course.toString() === courseId,
    );

    if (hasCourse || hasInWishlist) {
      throw new HttpException(
        'Cannot add to wishlist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { wishlist: courseId },
      },
      { new: true },
    )
      .select('wishlist')
      .exec();
  }

  public async removeFromWishlist(userId: string, courseId: string) {
    return this.UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: courseId },
      },
      { new: true },
    )
      .select('wishlist')
      .exec();
  }

  public async approveExam(answeredExamId: string, instructorId: string) {
    const user = await this.UserModel.findById(instructorId)
      .populate('unapprovedExams')
      .exec();

    console.log(user);

    const unapprovedExams = user.unapprovedExams.filter(
      (exam: any) => exam.id !== answeredExamId,
    );

    await this.UserModel.findByIdAndUpdate(instructorId, {
      unapprovedExams,
    }).exec();
  }

  public async addToUnapprovedExams(
    instructorId: string,
    answeredExamId: string,
  ) {
    return this.UserModel.findByIdAndUpdate(instructorId, {
      // @ts-ignore
      $push: { unapprovedExams: answeredExamId },
    });
  }

  public async addToCompletedExams(studentId: string, answeredExamId: string) {
    return this.UserModel.findByIdAndUpdate(studentId, {
      // @ts-ignore
      $push: { completedExams: answeredExamId },
    });
  }

  public async getUnapprovedExams(instructorId: string) {
    return this.UserModel.findById(instructorId)
      .populate({
        path: 'unapprovedExams',
        populate: {
          path: 'student exam',
          select: 'firstname lastname _id questions',
          populate: {
            path: 'questions',
          },
        },
      })
      .select('unapprovedExams')
      .exec();
  }

  public async getCompletedExams(studentId: string) {
    return this.UserModel.findById(studentId)
      .populate('completedExams')
      .select('completedExams')
      .exec();
  }

  public async getExams(studentId: string) {
    return this.UserModel.findById(studentId)
      .populate('exams')
      .select('exams')
      .exec();
  }

  public addToChats(userId: string, chatId: string) {
    return this.UserModel.findByIdAndUpdate(userId, {
      $push: { chats: chatId },
    });
  }

  public createChat(participants: string[]) {
    return this.ChatModel.create({ participants, messages: [] });
  }

  public async sendMessage(sendMessageDto: SendMessageDto) {
    const msg = await this.MessageModel.create({
      sender: sendMessageDto.sender,
      receiver: sendMessageDto.receiver,
      content: sendMessageDto.message,
    });
    await this.ChatModel.findByIdAndUpdate(sendMessageDto.chatId, {
      $push: { messages: msg.id },
    });
  }

  public async getMessages(chatId: string) {
    return this.ChatModel.findById(chatId)
      .populate('messages')
      .populate('participants', 'email _id')
      .exec();
  }

  public async updateUser(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.UserModel.findByIdAndUpdate(userId, updateProfileDto, {
      new: true,
    }).exec();
  }

  public async changePassword(userId: string, password: string) {
    return this.UserModel.findByIdAndUpdate(
      userId,
      {
        password,
      },
      {
        new: true,
      },
    ).exec();
  }

  public async addToCourses(userId: string, courseId: string) {
    return this.UserModel.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } },
      { new: true },
    ).exec();
  }
}
