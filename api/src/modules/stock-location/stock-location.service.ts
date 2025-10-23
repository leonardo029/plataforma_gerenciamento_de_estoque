import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockLocationRepository } from './repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { StockLocationEntity } from './entities';
import { CreateStockLocationDto, UpdateStockLocationDto } from './dto';

@Injectable()
export class StockLocationService {
  @InjectRepository(StockLocationRepository)
  private readonly stockLocationRepository: StockLocationRepository;

  async create(
    createStockLocationDto: CreateStockLocationDto,
  ): Promise<StockLocationEntity> {
    const alreadyExistsStockLocation =
      await this.stockLocationRepository.findOne({
        where: {
          shelf_id: createStockLocationDto.shelf_id,
          corridor_id: createStockLocationDto.corridor_id,
          section_id: createStockLocationDto.section_id,
        },
      });

    if (alreadyExistsStockLocation) {
      throw new ConflictException(`Stock location already in use`);
    }

    const stockLocation = this.stockLocationRepository.create(
      createStockLocationDto,
    );

    return await this.stockLocationRepository.save(stockLocation);
  }

  async update(
    id: string,
    updateStockLocationDto: UpdateStockLocationDto,
  ): Promise<StockLocationEntity> {
    const stockLocation = await this.stockLocationRepository.findOne({
      where: { id },
    });

    if (!stockLocation) {
      throw new NotFoundException(`Stock location with ID ${id} not found`);
    }

    Object.assign(stockLocation, updateStockLocationDto);
    return await this.stockLocationRepository.save(stockLocation);
  }

  async delete(id: string): Promise<void> {
    const stockLocation = await this.stockLocationRepository.findOne({
      where: { id: id },
    });

    if (!stockLocation) {
      throw new NotFoundException(`Stock location with ID ${id} not found`);
    }

    await this.stockLocationRepository.remove(stockLocation);
  }
}
