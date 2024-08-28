// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: [
        `.env.${process.env.NODE_ENV}`, // Load environment-specific file
        '.env', // Fallback to default
      ],
    }),
    CacheModule.register(),
    AuthModule,
    FlightsModule,
    BookingsModule,
    DatabaseModule,
  ],
})
export class AppModule {}
