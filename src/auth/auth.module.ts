import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserSchema } from './schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSeeder } from './seeders/user.seeder';

const ENVIRONMENT_DEV = 'dev';
const ENVIRONMENT_LOCAL = 'local';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, UserRepository, JwtStrategy, UserSeeder],
  controllers: [AuthController],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly userSeeder: UserSeeder) {}

  async onModuleInit() {
    await this.initializeSeeder();
  }

  private async initializeSeeder() {
    const environment = process.env.NODE_ENV;
    if (environment === ENVIRONMENT_LOCAL || environment === ENVIRONMENT_DEV) {
      await this.userSeeder.seed();
    }
  }
}