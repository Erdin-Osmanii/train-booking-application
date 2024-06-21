import { Controller, Get } from '@nestjs/common';
import { RailBelgiumClient } from 'src/core/infrastructure/external-api/rail-belgium/rail-belgium-client';

@Controller('stations')
export class StationController {
  constructor(private readonly railBelgiumClient: RailBelgiumClient) {}

  @Get()
    async getStations() {
        return this.railBelgiumClient.getStationData();
    }
}
