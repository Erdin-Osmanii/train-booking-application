import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './controllers/app/app.service';
import { UserModule } from './controllers/user/user.module';
import { StationModule } from './controllers/station/station.module';
import { AuthModule } from './controllers/auth/auth.module';
import { BookingModule } from './controllers/booking/booking.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UserModule, StationModule, AuthModule, BookingModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //   }),
    // },
  ],
})
export class AppModule {}
