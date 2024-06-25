import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './controllers/app/app.service';
import { UserModule } from './controllers/user/user.module';
import { StationModule } from './controllers/station/station.module';
import { AuthModule } from './controllers/auth/auth.module';
import { BookingModule } from './controllers/booking/booking.module';

@Module({
  imports: [UserModule, StationModule, AuthModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
