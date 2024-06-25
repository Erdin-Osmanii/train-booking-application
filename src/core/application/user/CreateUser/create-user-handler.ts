import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user-command';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/controllers/user/models/user-entity';
import { getEntityManager } from '@typedorm/core';
import { CreateUserResponse } from './create-user-response';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async createUser(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new BadRequestException('Name, email, and password are required.');
    }
    const NewUser = new User();
    NewUser.name = name;
    NewUser.email = email;
    const pw = password;
    NewUser.password = await NewUser.hashPassword(pw);
    NewUser.createdAt = new Date().toISOString();
    NewUser.updatedAt = new Date().toISOString();

    const entityManager = getEntityManager();
    const response = await entityManager.create(NewUser);

    return NewUser;
  }

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;
    const createdUser = await this.createUser(name, email, password);
    return new CreateUserResponse(
      createdUser.id,
      createdUser.name,
      createdUser.email,
    );
  }
}
