import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
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
      .populate('courses')
      .select('courses')
      .exec();
  }
}
