import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public createUser() {
    const user = new this.userModel({
      email: 'test@test.com',
      password: '123456',
    });

    return user.save();
  }

  public getUsers() {
    return this.userModel.find().exec();
  }
}
