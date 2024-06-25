import { Optional } from '@nestjs/common';

export class UserUpdateDto {
  @Optional()
  name: string;
  @Optional()
  email: string;
}
