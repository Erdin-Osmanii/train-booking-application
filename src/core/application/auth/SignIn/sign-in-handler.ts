import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './sign-in-command';
import { JwtService } from '@nestjs/jwt';
import { getEntityManager } from '@typedorm/core';
import { User } from 'src/controllers/user/models/user-entity';
import { UnauthorizedException } from '@nestjs/common';
import { SignInResponse } from './sign-in-response';
import { Token } from 'aws-sdk';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private jwtService: JwtService) {}
  async signIn(
    name: string,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const entityManager = getEntityManager();
    const response = await entityManager.find(
      User,
      { email: email },
      { queryIndex: 'GSI1' },
    );
    const user = response.items[0];

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const match = await user.comparePassword(password, user.password);

    if (user?.name !== name || !match) {
      throw new UnauthorizedException("Credentials don't match");
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async execute(command: SignInCommand) {
    const { name, email, password } = command;
    const token = await this.signIn(name, email, password);
    return new SignInResponse(token.access_token);
  }
}
