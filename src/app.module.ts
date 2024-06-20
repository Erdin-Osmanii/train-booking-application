import { Module } from '@nestjs/common';
import { AppController } from './common/controllers/app/app.controller';
import { AppService } from './common/controllers/app/app.service';
import { UserModule } from './common/controllers/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
