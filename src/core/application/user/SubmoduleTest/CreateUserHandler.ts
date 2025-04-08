
import { CreateUserDto } from '../../../../common/module/dto/CreateUserDto';

export class CreateUserHandler {
  async handle(createUserDto: CreateUserDto): Promise<void> {
    console.log('User created with data:', createUserDto);
  }
}
