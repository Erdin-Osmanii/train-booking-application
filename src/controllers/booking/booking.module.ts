import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBookingHandler } from 'src/core/application/booking/CreateBooking/create-booking-handler';
import { GetBookingHandler } from 'src/core/application/booking/GetBooking/get-booking-handler';
import { UpdateBookingHandler } from 'src/core/application/booking/UpdateBooking/update-booking-handler';
import { DeleteBookingHandler } from 'src/core/application/booking/DeleteBooking/delete-booking-handler';

@Module({
  imports: [CqrsModule],
  controllers: [BookingController],
  providers: [CreateBookingHandler, GetBookingHandler, UpdateBookingHandler, DeleteBookingHandler],
})
export class BookingModule {}
