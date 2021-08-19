import { Injectable } from '@nestjs/common';
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

  public createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);

    return user.save();
  }

  public getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
