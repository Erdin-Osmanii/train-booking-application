import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getEntityManager } from '@typedorm/core';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserBookingsQuery } from './get-user-bookings-query';
import {
  GetUserBookingsResponse,
  UserBooking,
} from './get-user-bookings-response';
import { Booking } from 'src/controllers/booking/modles/booking-entity';
import { User } from 'src/controllers/user/models/user-entity';

@QueryHandler(GetUserBookingsQuery)
export class GetUserBookingsHandler
  implements IQueryHandler<GetUserBookingsQuery>
{
  async getUser(id: string, logedInId: string, ignorePrevious: boolean) {
    if (!id) {
      throw new BadRequestException('Id is required.');
    }

    const entityManager = getEntityManager();
    const user = await entityManager.findOne(User, { id: id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.id !== logedInId) {
      throw new UnauthorizedException(
        'You are not authorized to view these bookings.',
      );
    }
    const response = await entityManager.find(
      Booking,
      { userId: id },
      { queryIndex: 'GSI1' },
    );

    const bookings = response.items;
    const date = new Date();

    if (ignorePrevious) {
      return bookings.filter((booking) => {
        const arrivalTime = new Date(booking.arrivalTime);
        return arrivalTime > date;
      });
    }

    return bookings;
  }

  async execute(querry: GetUserBookingsQuery) {
    const { id, logedInId, ignorePrevious } = querry;
    const bookings = await this.getUser(id, logedInId, ignorePrevious);

    const userBookings: UserBooking[] = bookings.map((booking) => {
      return new UserBooking(
        booking.id,
        booking.userId,
        booking.trainName,
        booking.departureTime,
        booking.arrivalTime,
        booking.origin,
        booking.destination,
      );
    });

    return new GetUserBookingsResponse(userBookings);
  }
}
