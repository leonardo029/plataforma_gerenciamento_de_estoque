import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateStockLocationDto } from 'src/modules/stock-location/dto';

export class CreateStockDto {
  @IsUUID()
  product_id: string;

  @IsString()
  @MaxLength(45)
  batch: string;

  @IsDateString()
  expiration_date: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  cost_price: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sale_price: number;

  @IsUUID()
  supplier_id: string;

  @IsInt()
  @Min(0)
  stock_quantity: number;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateStockLocationDto)
  stock_location: CreateStockLocationDto;
}
