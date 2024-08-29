// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'; // Necessary import

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', 'mongodb://localhost/nest'), // Fallback URI
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}