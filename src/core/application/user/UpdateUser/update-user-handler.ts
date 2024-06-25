import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user-command';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/controllers/user/models/user-entity';
import { getEntityManager } from '@typedorm/core';
import { UpdateUserResponse } from './update-user-response';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  async UpdateUser(id: string, logedInId: string, name: string, email: string) {
    if (!name && !email) {
      throw new BadRequestException('At least one field is required');
    }

    const entityManager = getEntityManager();

    let oldUser = await entityManager.findOne(User, { id: id });

    if (!oldUser) {
      throw new NotFoundException('User not found');
    }

    if (logedInId !== oldUser.id) {
      throw new UnauthorizedException('Not the loged in user');
    }

    let UpdatedUser = new User();
    UpdatedUser.name = name ?? oldUser.name;
    UpdatedUser.email = email ?? oldUser.email;

    const updatedAt = new Date().toISOString();

    const response = await entityManager.update(
      User,
      { id: id },
      {
        name: UpdatedUser.name,
        email: UpdatedUser.email,
        updatedAt: updatedAt,
      },
    );

    return response;
  }

  async execute(command: UpdateUserCommand) {
    const { id, logedInId, name, email } = command;
    const updatedUser = await this.UpdateUser(id, logedInId, name, email);
    return new UpdateUserResponse(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
    );
  }
}
