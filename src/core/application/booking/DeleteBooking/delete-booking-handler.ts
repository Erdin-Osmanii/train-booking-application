import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { getEntityManager } from '@typedorm/core';
import { DeleteBookingCommand } from './delete-booking-command';
import { DeleteBookingResponse } from './delete-booking-response';
import { Booking } from 'src/controllers/booking/modles/booking-entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler
  implements ICommandHandler<DeleteBookingCommand>
{
  async DeleteBooking(id: string, userId: string) {
    const entityManager = getEntityManager();

    const booking = await entityManager.findOne(Booking, { id: id });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (userId !== booking.userId) {
      throw new UnauthorizedException('Booking does not belong to user');
    }
    const deletedBooking = await entityManager.delete(Booking, { id: id });
    return deletedBooking;
  }

  async execute(command: DeleteBookingCommand) {
    const { id, userId } = command;
    const deletedBooking = await this.DeleteBooking(id, userId);
    return new DeleteBookingResponse(deletedBooking.success);
  }
}
