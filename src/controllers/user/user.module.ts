import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/core/application/user/CreateUser/create-user-handler';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [CreateUserHandler],
})
export class UserModule {}
