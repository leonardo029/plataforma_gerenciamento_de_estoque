import { Controller, Get, Inject } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  @Inject(StateService)
  private readonly stateService: StateService;

  @Get()
  findAll() {
    return this.stateService.findAll();
  }
}
