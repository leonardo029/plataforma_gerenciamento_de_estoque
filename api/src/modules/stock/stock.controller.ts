import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/entities';
import { CreateStockDto, RemoveStockDto } from './dto';
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
}
