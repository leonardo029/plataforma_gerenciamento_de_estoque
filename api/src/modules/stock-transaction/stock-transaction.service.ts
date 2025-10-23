import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockTransactionDto } from './dto';
import { StockTransactionRepository } from './repositories';

@Injectable()
export class StockTransactionService {
  @InjectRepository(StockTransactionRepository)
  private readonly stockTransactionRepository: StockTransactionRepository;

  async create(
    createStockTransactionDto: CreateStockTransactionDto,
  ): Promise<void> {
    const stockTransaction = this.stockTransactionRepository.create({
      quantity: createStockTransactionDto.quantity,
      user_id: createStockTransactionDto.user_id,
      stock_id: createStockTransactionDto.stock_id,
      action: createStockTransactionDto.action,
      description: createStockTransactionDto.description,
    });
    await this.stockTransactionRepository.save(stockTransaction);
  }
}
