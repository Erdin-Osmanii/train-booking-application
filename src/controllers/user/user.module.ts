import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/core/application/user/CreateUser/create-user-handler';
import { GetUserHandler } from 'src/core/application/user/GetUser/get-user-handler';
import { UpdateUserHandler } from 'src/core/application/user/UpdateUser/update-user-handler';
import { DeleteUserHandler } from 'src/core/application/user/DeleteUser/delete-user-handler';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [CreateUserHandler, GetUserHandler, UpdateUserHandler, DeleteUserHandler],
})
export class UserModule {}
