import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/controllers/user/models/user-entity';
import { getEntityManager } from '@typedorm/core';
import { CreateBookingCommand } from './create-booking-command';
import { CreateBookingResponse } from './create-booking-response';
import { Booking } from 'src/controllers/booking/modles/booking-entity';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  async createBooking(
    userId: string,
    trainName: string,
    departureTime: string,
    arrivalTime: string,
    origin: string,
    destination: string,
  ) {
    if (!userId || !trainName || !departureTime || !arrivalTime || !origin || !destination) {
      throw new BadRequestException('Cannot create booking without required fields.');
    }
    const NewBooking= new Booking();
    NewBooking.userId = userId;
    NewBooking.trainName = trainName;
    NewBooking.departureTime = departureTime;
    NewBooking.arrivalTime = arrivalTime;
    NewBooking.origin = origin;
    NewBooking.destination = destination;
    NewBooking.createdAt = new Date().toISOString();
    NewBooking.updatedAt = new Date().toISOString();

    const entityManager = getEntityManager();
    const response = await entityManager.create(NewBooking);

    return NewBooking;
  }

  async execute(command: CreateBookingCommand) {
    const {
      userId,
      trainName,
      departureTime,
      arrivalTime,
      origin,
      destination,
    } = command;
    const createdBooking = await this.createBooking(
      userId,
      trainName,
      departureTime,
      arrivalTime,
      origin,
      destination,
    );
    return new CreateBookingResponse(
      createdBooking.id,
      createdBooking.userId,
      createdBooking.trainName,
      createdBooking.departureTime,
      createdBooking.arrivalTime,
      createdBooking.origin,
      createdBooking.destination,
    );
  }
}
