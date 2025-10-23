import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional';
import { StockLocationService } from '../stock-location/stock-location.service';
import { CreateStockTransactionDto } from '../stock-transaction/dto';
import { CreateStockDto, RemoveStockDto, UpdateStockDto } from './dto';
import { StockRepository } from './repositories';
import { ActionType } from '../stock-transaction/types';
import { StockTransactionService } from '../stock-transaction/stock-transaction.service';
import { CreateStockLocationDto } from '../stock-location/dto';
import { ProductSupplierService } from '../product-supplier/product-supplier.service';
import { CreateProductSupplierDto } from '../product-supplier/dto';
import { FindAllStockResource, FindByIdStockResource } from './resources';
import { SupplierService } from '../supplier/supplier.service';
@Injectable()
export class StockService {
  @InjectRepository(StockRepository)
  private readonly stockRepository: StockRepository;

  @Inject(StockLocationService)
  private readonly stockLocationService: StockLocationService;

  @Inject(StockTransactionService)
  private readonly stockTransactionService: StockTransactionService;

  @Inject(ProductSupplierService)
  private readonly productSupplierService: ProductSupplierService;

  @Inject(SupplierService)
  private readonly supplierService: SupplierService;

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
      description: `Entry of ${stock.product_id} product into stock`,
    };
    await this.stockTransactionService.create(infosTransaction);

    const infosProductSupplier: CreateProductSupplierDto = {
      supplier_id: stock.supplier_id,
      product_id: stock.product_id,
    };
    await this.productSupplierService.create(infosProductSupplier);
  }

  @Transactional()
  async remove(removeStockDto: RemoveStockDto, id: string): Promise<void> {
    const stock = await this.stockRepository.findOne({
      where: { id: removeStockDto.stock_id },
    });

    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    if (removeStockDto.stock_quantity > stock.stock_quantity) {
      throw new ConflictException(
        `Quantity in stock is less than the desired withdrawal quantity`,
      );
    }

    stock.stock_quantity -= removeStockDto.stock_quantity;

    await this.stockRepository.save(stock);

    const infosTransaction: CreateStockTransactionDto = {
      quantity: removeStockDto.stock_quantity,
      user_id: id,
      stock_id: removeStockDto.stock_id,
      action: ActionType.OUTPUT,
      description: `Withdraw of ${removeStockDto.stock_quantity} units of ${stock.product_id} from stock`,
    };
    await this.stockTransactionService.create(infosTransaction);
  }

  @Transactional()
  async update(
    id: string,
    updateStockDto: UpdateStockDto,
    userId: string,
  ): Promise<void> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: ['supplier', 'stockLocation'],
    });

    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    const { supplier_id, stock_location, ...stockData } = updateStockDto;

    Object.assign(stock, stockData);

    if (supplier_id) {
      const supplier = await this.supplierService.findById(supplier_id);
      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${supplier_id} not found`,
        );
      }
      stock.supplier_id = supplier.id as string;
    }

    if (stock_location) {
      const updatedLocation = await this.stockLocationService.update(
        stock.stockLocation?.id,
        stock_location,
      );
      stock.stockLocation = updatedLocation;
    }

    await this.stockRepository.save(stock);

    const infosTransaction: CreateStockTransactionDto = {
      quantity: stockData.stock_quantity,
      user_id: userId,
      stock_id: stock.id,
      action: ActionType.UPDATE,
      description: `Update of ${stock.id} stock characteristics`,
    };
    await this.stockTransactionService.create(infosTransaction);
  }

  @Transactional()
  async delete(id: string, userId: string): Promise<void> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: ['stockLocation'],
    });

    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    stock.isActivated = false;
    await this.stockRepository.save(stock);

    if (stock.stockLocation) {
      await this.stockLocationService.delete(stock.stockLocation.id);
    }

    const infosTransaction: CreateStockTransactionDto = {
      user_id: userId,
      stock_id: stock.id,
      action: ActionType.DELETE,
      description: `Soft delete of ${stock.id} stock item`,
    };
    await this.stockTransactionService.create(infosTransaction);
  }

  async findById(id: string): Promise<FindByIdStockResource> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: [
        'supplier',
        'stockLocation',
        'stockLocation.shelf',
        'stockLocation.corridor',
        'stockLocation.section',
        'product',
        'product.brand',
        'product.category',
      ],
    });

    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    return new FindByIdStockResource(stock);
  }

  async findAll(): Promise<FindAllStockResource[]> {
    const stocks = await this.stockRepository.find({
      where: { isActivated: true },
      relations: ['product'],
    });
    return stocks.map((stock) => new FindAllStockResource(stock));
  }
}
