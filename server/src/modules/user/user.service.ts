import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = new this.userModel(createUserDto);

      return await user.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  public getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  public findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }
}
