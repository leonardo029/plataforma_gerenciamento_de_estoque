import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';

@Controller('supplier')
export class SupplierController {
  @Inject(SupplierService)
  private readonly supplierService: SupplierService;

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.supplierService.delete(id);
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.supplierService.findById(id);
  }
}
