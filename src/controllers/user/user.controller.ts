import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user_entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/core/application/user/CreateUser/create-user-command';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() user: User) {
    const command = new CreateUserCommand(user.name, user.email, user.password);
    const createdUser = await this.commandBus.execute(command);
    return createdUser;
  }
}
