import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user_entity';
import { getEntityManager } from '@typedorm/core';

@Injectable()
export class UserService {
  constructor() {}
}
