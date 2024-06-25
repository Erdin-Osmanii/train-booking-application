import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user-query';
import { getEntityManager } from '@typedorm/core';
import { User } from 'src/controllers/user/models/user-entity';
import { GetUserResponse } from './get-user-response';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  async getUser(id: string) {
    if (!id) {
      throw new BadRequestException('Id is required.');
    }
    const entityManager = getEntityManager();
    const response = await entityManager.findOne(User, {
      id: id,
    });

    return response;
  }

  async execute(querry: GetUserQuery) {
    const { id } = querry;
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new GetUserResponse(user.id, user.name, user.email);
  }
}
