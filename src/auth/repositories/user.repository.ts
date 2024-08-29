import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

// Just a simple user repo
@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  async findByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(username: string, password: string, roles?: string[]): Promise<User> {
    const saltRounds = 10; // Number of salt rounds for hashing
    const bcrypt = await import('bcrypt-ts'); // Dynamic import of bcrypt-ts module
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new this.userModel({ username, password: hashedPassword, roles:roles||["user"] });
    return newUser.save();
  }
}
