import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { SignInHandler } from 'src/core/application/auth/SignIn/sign-in-handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants(),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [SignInHandler],
  controllers: [AuthController],
  exports: [SignInHandler],
})
export class AuthModule {}
