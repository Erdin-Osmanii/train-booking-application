import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Booking } from './modles/booking-entity';
import { CreateBookingCommand } from 'src/core/application/booking/CreateBooking/create-booking-command';
import { GetBookingQuery } from 'src/core/application/booking/GetBooking/get-booking-query';
import { UpdateBookingCommand } from 'src/core/application/booking/UpdateBooking/update-booking-command';
import { DeleteBookingCommand } from 'src/core/application/booking/DeleteBooking/delete-booking-command';
import { CreateBookingDto } from './dtos/create-booking-dto';
import { Update } from '@typedorm/core/cjs/src/classes/expression/update/update';
import { UpdateBookingDto } from './dtos/update-booking-dto';

@UseGuards(AuthGuard)
@Controller('booking')
export class BookingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createBooking(@Body() booking: CreateBookingDto, @Request() req) {
    const command = new CreateBookingCommand(
      req.user.sub,
      booking.trainName,
      booking.departureTime,
      booking.arrivalTime,
      booking.origin,
      booking.destination,
    );
    const createdBooking = await this.commandBus.execute(command);
    return createdBooking;
  }

  @Get(':id')
  async getBooking(@Param('id') id: string, @Request() req) {
    const query = new GetBookingQuery(id, req.user.sub);
    const booking = await this.queryBus.execute(query);
    return booking;
  }

  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() bookingData: UpdateBookingDto,
    @Request() req,
  ) {
    const command = new UpdateBookingCommand(
      id,
      req.user.sub,
      bookingData.trainName,
      bookingData.departureTime,
      bookingData.arrivalTime,
      bookingData.origin,
      bookingData.destination,
    );
    const updatedBooking = await this.commandBus.execute(command);
    return updatedBooking;
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string, @Request() req) {
    const command = new DeleteBookingCommand(id, req.user.sub);
    const deletedBooking = await this.commandBus.execute(command);
    return deletedBooking;
  }
}
