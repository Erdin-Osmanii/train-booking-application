import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getEntityManager } from '@typedorm/core';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetBookingQuery } from './get-booking-query';
import { GetBookingResponse } from './get-booking-response';
import { Booking } from 'src/controllers/booking/modles/booking-entity';

@QueryHandler(GetBookingQuery)
export class GetBookingHandler implements IQueryHandler<GetBookingQuery> {
  async getBooking(id: string, userId: string) {
    if (!id) {
      throw new BadRequestException('Id is required.');
    }
    const entityManager = getEntityManager();
    const response = await entityManager.findOne(Booking, {
      id: id,
    });

    if (!response) {
      throw new NotFoundException('Booking not found');
    }

    if (response.userId !== userId) {
      throw new UnauthorizedException('Booking does not belong to user');
    }

    return response;
  }

  async execute(querry: GetBookingQuery) {
    const { id, userId } = querry;
    const booking = await this.getBooking(id, userId);
    return new GetBookingResponse(
      booking.id,
      booking.userId,
      booking.trainName,
      booking.departureTime,
      booking.arrivalTime,
      booking.origin,
      booking.destination,
    );
  }
}
