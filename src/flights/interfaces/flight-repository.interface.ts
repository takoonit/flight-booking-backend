import { Flight } from './flight.interface';

export interface FlightRepositoryInterface {
  fetchFlights(): Promise<Flight[]>; // Method to retrieve all flights
  fetchLocations(): Promise<string[]>; // Method to retrieve a flight by ID
  create(flight: Flight): Promise<Flight>; // Method to create a new flight
}
