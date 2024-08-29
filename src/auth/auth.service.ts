import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const bcrypt = await import('bcrypt-ts');
    const user = await this.userRepository.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) { // Use bcrypt-ts to compare passwords
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (user) {
      throw new UnauthorizedException('Username already exists');
    }
    const newUser = await this.userRepository.createUser(username, password);
    return this.login(newUser);
  }
}
