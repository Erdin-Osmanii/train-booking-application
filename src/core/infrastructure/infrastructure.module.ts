import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RailBelgiumClient } from 'src/core/infrastructure/external-api/rail-belgium/rail-belgium-client';

@Module({
  imports: [HttpModule],
  providers: [RailBelgiumClient],
  exports: [RailBelgiumClient],
})
export class InfrastructureModule {}
