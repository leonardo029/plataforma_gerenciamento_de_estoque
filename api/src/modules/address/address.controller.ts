import { Controller, Get, Inject } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  @Inject(AddressService)
  private readonly addressService: AddressService;

  @Get('street-type')
  findAllStreetTypes() {
    return this.addressService.findAllStreetTypes();
  }
}
