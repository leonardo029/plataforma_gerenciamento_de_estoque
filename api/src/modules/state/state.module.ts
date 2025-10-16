import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  providers: [StateService, StateRepository],
  controllers: [StateController],
  exports: [StateService],
})
export class StateModule {}
