import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user_entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/core/application/user/CreateUser/create-user-command';
import { GetUserQuery } from 'src/core/application/user/GetUser/get-user-querry';
import { UpdateUserCommand } from 'src/core/application/user/UpdateUser/update-user-command';
import { DeleteUserCommand } from 'src/core/application/user/DeleteUser/delete-user-command';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() user: User) {
    const command = new CreateUserCommand(user.name, user.email, user.password);
    const createdUser = await this.commandBus.execute(command);
    return createdUser;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const query = new GetUserQuery(id);
    const user = await this.queryBus.execute(query);
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: User) {
    const command = new UpdateUserCommand(id, userData.name, userData.email);
    const updatedUser = await this.commandBus.execute(command);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    const deletedUser = await this.commandBus.execute(command);
    return deletedUser;    
  }
}
