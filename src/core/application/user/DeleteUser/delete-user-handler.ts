import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user-command';
import { User } from 'src/controllers/user/models/user-entity';
import { getEntityManager } from '@typedorm/core';
import { DeleteUserResponse } from './delete-user-response';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  async DeleteUser(id: string, logedInId: string) {
    const entityManager = getEntityManager();
    const user = await entityManager.findOne(User, { id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== logedInId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this user',
      );
    }
    const deletedUser = await entityManager.delete(User, { id: id });
    return deletedUser;
  }

  async execute(command: DeleteUserCommand) {
    const { id, logedInId } = command;
    const deletedUser = await this.DeleteUser(id, logedInId);
    return new DeleteUserResponse(deletedUser.success);
  }
}
