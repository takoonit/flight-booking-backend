import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces/flight.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
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
