import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FLIGHT_REPOSITORY_TOKEN } from './flights.constant';
import { FlightRepository } from './repositories/flight-repository';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(), // Register the CacheModule
  ],
  providers: [
    FlightsService,
    { provide: FLIGHT_REPOSITORY_TOKEN, useClass: FlightRepository }, // Use FileFlightDataSourceService for FlightDataSource
  ],
})
export class FlightsModule {
}
