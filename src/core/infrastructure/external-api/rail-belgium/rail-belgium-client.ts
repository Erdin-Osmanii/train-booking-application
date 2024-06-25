import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RailBelgiumGetStationsResponse } from './models/rail-belgium-get-stations-response';
import { AxiosResponse } from 'axios';

@Injectable()
export class RailBelgiumClient {
  constructor(private readonly httpService: HttpService) {} 
  async getStationData(): Promise<RailBelgiumGetStationsResponse> {
    try {
      const response: AxiosResponse = await this.httpService
        .get('https://api.irail.be/stations/?format=json&lang=en')
        .toPromise();
      const stationData: RailBelgiumGetStationsResponse = response.data.station;
      return stationData;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch data from external Rail Belgium Api',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
