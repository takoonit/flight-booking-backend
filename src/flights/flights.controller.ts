import { Controller, Get, Query } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces/flight.interface';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  async searchFlights(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('date') date: string,
  ): Promise<Flight[]> {
    return await this.flightsService.searchFlights(origin, destination, date);
  }

  @Get('list-location')
  async listLocation(
  ): Promise<string[]> {
    return await this.flightsService.listFlightLocation();
  }
}
