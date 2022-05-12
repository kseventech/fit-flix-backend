import { Module } from '@nestjs/common';
import { EqupmentService } from './equpment.service';
import { EqupmentResolver } from './equpment.resolver';

@Module({
  providers: [EqupmentResolver, EqupmentService],
})
export class EqupmentModule {}
