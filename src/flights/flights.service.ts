import { Inject, Injectable } from '@nestjs/common';
import { FlightRepository } from './repositories/flight-repository';
import { Flight } from './interfaces/flight.interface';
import { FLIGHT_REPOSITORY_TOKEN } from './flights.constant';

@Injectable()
export class FlightsService {
  constructor(@Inject(FLIGHT_REPOSITORY_TOKEN) private readonly flightRepository: FlightRepository) {
  } // Inject the repository

  async searchFlights(origin: string, destination: string, date: string): Promise<Flight[]> {
    const flights = await this.flightRepository.fetchFlights(); // Use the repository to find all flights
    return flights.filter(
      (flight) =>
        flight.origin === origin &&
        flight.destination === destination &&
        flight.date === date,
    );
  }

  async listFlightLocation(): Promise<string[]> {
    return await this.flightRepository.fetchLocations();
  }
}
