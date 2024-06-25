import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { getEntityManager } from '@typedorm/core';
import { UpdateBookingCommand } from './update-booking-command';
import { UpdateBookingResponse } from './update-booking-response';
import { Booking } from 'src/controllers/booking/modles/booking-entity';

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingHandler
  implements ICommandHandler<UpdateBookingCommand>
{
  async UpdateBooking(
    id: string,
    userId: string,
    trainName: string,
    departureTime: string,
    arrivalTime: string,
    origin: string,
    destination: string,
  ) {
    if (
      !trainName &&
      !departureTime &&
      !arrivalTime &&
      !origin &&
      !destination
    ) {
      throw new BadRequestException('At least one field is required');
    }

    const entityManager = getEntityManager();
    const oldBooking = await entityManager.findOne(Booking, { id: id });

    if (!oldBooking) {
      throw new NotFoundException('Booking not found');
    }

    if (userId !== oldBooking.userId) {
      throw new UnauthorizedException('Booking does not belong to user');
    }

    let updatedBooking = new Booking();

    updatedBooking.trainName = trainName ?? oldBooking.trainName;
    updatedBooking.departureTime = departureTime ?? oldBooking.departureTime;
    updatedBooking.arrivalTime = arrivalTime ?? oldBooking.arrivalTime;
    updatedBooking.origin = origin ?? oldBooking.origin;
    updatedBooking.destination = destination ?? oldBooking.destination;
    const updatedAt = new Date().toISOString();

    const response = await entityManager.update(
      Booking,
      { id: id },
      {
        trainName: updatedBooking.trainName,
        departureTime: updatedBooking.departureTime,
        arrivalTime: updatedBooking.arrivalTime,
        origin: updatedBooking.origin,
        destination: updatedBooking.destination,
        updatedAt: updatedAt,
      },
    );

    return response;
  }

  async execute(command: UpdateBookingCommand) {
    const {
      id,
      userId,
      trainName,
      departureTime,
      arrivalTime,
      origin,
      destination,
    } = command;
    const updatedBooking = await this.UpdateBooking(
      id,
      userId,
      trainName,
      departureTime,
      arrivalTime,
      origin,
      destination,
    );
    return new UpdateBookingResponse(
      updatedBooking.id,
      updatedBooking.userId,
      updatedBooking.trainName,
      updatedBooking.departureTime,
      updatedBooking.arrivalTime,
      updatedBooking.origin,
      updatedBooking.destination,
    );
  }
}
