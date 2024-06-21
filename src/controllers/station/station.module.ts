import { Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { InfrastructureModule } from '../../core/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [StationController]
})
export class StationModule {}
