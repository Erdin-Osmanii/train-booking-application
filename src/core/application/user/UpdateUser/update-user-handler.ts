import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user-command';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/controllers/user/user_entity';
import { getEntityManager } from '@typedorm/core';
import { UpdateUserResponse } from './update-user-response';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  async UpdateUser(id: string, name: string, email: string) {
    if (!name && !email) {
      throw new BadRequestException('Name, email, and password are required.');
    }
    const newName = name;
    const newEmail = email;
    const updatedAt = new Date().toISOString();

    const entityManager = getEntityManager();

    let UpdatedUser;

    if (!name) {
      UpdatedUser = await entityManager.update(
        User,
        { id: id },
        {
          email: newEmail,
          updatedAt: updatedAt,
        },
      );
    }
    if (!email) {
      UpdatedUser = await entityManager.update(
        User,
        { id: id },
        {
          name: newName,
          updatedAt: updatedAt,
        },
      );
    } else {
      UpdatedUser = await entityManager.update(
        User,
        { id: id },
        {
          name: newName,
          email: newEmail,
          updatedAt: updatedAt,
        },
      );
    }

    if (!UpdatedUser.id) {
      throw new NotFoundException('User not found');
    }

    return UpdatedUser;
  }

  async execute(command: UpdateUserCommand) {
    const { id, name, email } = command;
    const updatedUser = await this.UpdateUser(id, name, email);
    return new UpdateUserResponse(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
    );
  }
}
