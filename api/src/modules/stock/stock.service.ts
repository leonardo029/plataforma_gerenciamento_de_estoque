import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { StockLocationService } from '../stock-location/stock-location.service';
import { CreateStockTransactionDto } from '../stock-transaction/dto';
import { CreateStockDto } from './dto';
import { StockRepository } from './repositories';
import { ActionType } from '../stock-transaction/types';
import { StockTransactionService } from '../stock-transaction/stock-transaction.service';
import { CreateStockLocationDto } from '../stock-location/dto';
@Injectable()
export class StockService {
  @InjectRepository(StockRepository)
  private readonly stockRepository: StockRepository;

  @Inject(StockLocationService)
  private readonly stockLocationService: StockLocationService;

  @Inject(StockTransactionService)
  private readonly stockTransactionService: StockTransactionService;

  @Transactional()
  async create(createStockDto: CreateStockDto, id: string): Promise<void> {
    const infosLocation: CreateStockLocationDto = {
      shelf_id: createStockDto.stock_location.shelf_id,
      corridor_id: createStockDto.stock_location.corridor_id,
      section_id: createStockDto.stock_location.section_id,
    };
    const stockLocation = await this.stockLocationService.create(infosLocation);

    const stock = this.stockRepository.create({
      ...createStockDto,
      stock_location_id: stockLocation.id,
    });
    await this.stockRepository.save(stock);

    const infosTransaction: CreateStockTransactionDto = {
      quantity: stock.stock_quantity,
      user_id: id,
      stock_id: stock.id,
      action: ActionType.INPUT,
    };
    await this.stockTransactionService.create(infosTransaction);
  }
}
