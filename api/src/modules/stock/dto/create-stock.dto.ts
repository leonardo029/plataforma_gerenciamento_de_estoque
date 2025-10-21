import {
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

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

  @IsUUID()
  stock_location_id: string;
}
