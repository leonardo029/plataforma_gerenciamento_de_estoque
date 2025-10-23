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
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/entities';
import { CreateStockDto, RemoveStockDto, UpdateStockDto } from './dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  @Inject(StockService)
  private readonly stockService: StockService;

  @Post()
  create(
    @Body() createStockDto: CreateStockDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.stockService.create(createStockDto, user.id);
  }

  @Post('/withdraw')
  remove(
    @Body() removeStockDto: RemoveStockDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.stockService.remove(removeStockDto, user.id);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Delete(':id')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.stockService.delete(id, user.id);
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.stockService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateStockDto: UpdateStockDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.stockService.update(id, updateStockDto, user.id);
  }
}
