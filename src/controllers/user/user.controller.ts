import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { User } from './models/user-entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/core/application/user/CreateUser/create-user-command';
import { UpdateUserCommand } from 'src/core/application/user/UpdateUser/update-user-command';
import { DeleteUserCommand } from 'src/core/application/user/DeleteUser/delete-user-command';
import { GetUserQuery } from 'src/core/application/user/GetUser/get-user-query';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dtos/update-user-dto';
import { CreateUserDto } from './dtos/create-user-dto';
import { GetUserBookingsQuery } from 'src/core/application/user/GetUserBookings/get-user-bookings-query';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
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

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
    @Request() req,
  ) {
    const command = new UpdateUserCommand(
      id,
      req.user.sub,
      userData.name,
      userData.email,
    );
    const updatedUser = await this.commandBus.execute(command);
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Request() req) {
    const command = new DeleteUserCommand(id, req.user.sub);
    const deletedUser = await this.commandBus.execute(command);
    return deletedUser;
  }

  @UseGuards(AuthGuard)
  @Get(':id/bookings')
  async getUserBookings(
    @Param('id') id: string,
    @Request() req,
    @Query('ignorePrevious') ignorePrevious: boolean,
  ) {
    const query = new GetUserBookingsQuery(id, req.user.sub, ignorePrevious);
    const bookings = await this.queryBus.execute(query);
    return bookings;
  }
}
