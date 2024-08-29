import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserSeeder {
  constructor(private readonly userRepository: UserRepository) {}

  async seed() {
    const users = [
      { username: 'testuser1', password: 'password123' },
      { username: 'testuser2', password: 'password123' },
      { username: 'admin', password: 'admin123' },
    ];

    for (const user of users) {
      const existingUser = await this.userRepository.findByUsername(user.username);
      if (!existingUser) {
        await this.userRepository.createUser(user.username, user.password);
        console.log(`User ${user.username} created successfully`);
      } else {
        console.log(`User ${user.username} already exists`);
      }
    }
  }
}
