import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './controllers/app/app.service';
import { UserModule } from './controllers/user/user.module';
import { StationModule } from './controllers/station/station.module';
import { AuthModule } from './controllers/auth/auth.module';

@Module({
  imports: [UserModule, StationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
