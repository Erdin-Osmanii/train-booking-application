import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user-command';
import { User } from 'src/controllers/user/user_entity';
import { getEntityManager } from '@typedorm/core';
import { DeleteUserResponse } from './delete-user-response';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  async DeleteUser(id: string) {
    const entityManager = getEntityManager();
    const deletedUser = await entityManager.delete(User, { id: id });
    return deletedUser;
  }

  async execute(command: DeleteUserCommand) {
    const { id } = command;
    const deletedUser = await this.DeleteUser(id);
    return new DeleteUserResponse(deletedUser.success);
  }
}
