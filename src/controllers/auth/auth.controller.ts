import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from 'src/core/application/auth/SignIn/sign-in-command';
import { SignInDto, signInSchema } from './dtos/sign-in-dto';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ZodValidationPipe(signInSchema)) signInDto: SignInDto) {
    const command = new SignInCommand(signInDto.email, signInDto.password);
    const token = this.commandBus.execute(command);
    return token;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
