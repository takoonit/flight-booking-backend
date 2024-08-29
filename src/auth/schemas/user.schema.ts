import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }, // Default role is 'user'
});
