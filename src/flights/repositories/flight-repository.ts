import {Injectable, Inject}  from '@nestjs/common';
import { Cache } from 'cache-manager';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Flight } from '../interfaces/flight.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class FlightRepository implements FlightRepository {
  private static readonly MOCK_DATA_PATH = path.join(__dirname, '../mock/flights.json');
  private static readonly CACHE_KEY = 'allFlights';
  private static readonly LOCATIONS_CACHE_KEY = 'flightLocations';

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Inject CacheManager
  ) {
  }

  async fetchFlights(): Promise<Flight[]> {
    // First, try to get the flights data from the cache
    const cachedFlights = await this.cacheManager.get<Flight[]>(FlightRepository.CACHE_KEY);
    if (cachedFlights) {
      await this.updateLocationsCache(cachedFlights); // Update locations cache if flights are found in cache
      return cachedFlights;
    }

    try {
      const data = await fs.readFile(FlightRepository.MOCK_DATA_PATH, 'utf8');
      const flights: Flight[] = JSON.parse(data);

      // Store the parsed data in the cache with a suitable TTL (time-to-live)
      await this.cacheManager.set(FlightRepository.CACHE_KEY, flights, 600);
      await this.updateLocationsCache(flights); // Update locations cache with fresh flights data

      return flights;
    } catch (error) {
      this.logReadError(error);
      return [];
    }
  }

  private async updateLocationsCache(flights: Flight[]): Promise<void> {
    const locations = new Set<string>();

    flights.forEach(flight => {
      locations.add(flight.origin);
      locations.add(flight.destination);
    });

    await this.cacheManager.set(FlightRepository.LOCATIONS_CACHE_KEY, Array.from(locations), 420000);//There are 420,000 milliseconds in 7 minutes (TTL)
  }

  async fetchLocations(): Promise<string[]> {
    const cachedLocations = await this.cacheManager.get<string[]>(FlightRepository.LOCATIONS_CACHE_KEY);
    return cachedLocations || [];
  }

  private logReadError(error: Error): void {
    console.error('Error reading mock flights data:', error);
  }
}