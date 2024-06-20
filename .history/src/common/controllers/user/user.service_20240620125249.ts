import { Injectable } from '@nestjs/common';
import { User } from './user_entity';
import { getEntityManager } from '@typedorm/core';

@Injectable()
export class UserService {
  constructor() {}
  async createUser() {
    const user = new User();
    user.name = 'John Doe';
    user.email = 'johndoe@gmail.com';
    user.password = await user.hashPassword(upassword);
    user.createdAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();

    const entityManger = getEntityManager();
    const response = await entityManger.create(user);

    return response;
  }
}
