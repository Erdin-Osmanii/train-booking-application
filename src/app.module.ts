import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './controllers/app/app.service';
import { UserModule } from './controllers/user/user.module';
import { StationModule } from './controllers/station/station.module';

@Module({
  imports: [UserModule, StationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
