import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { UpdateStockLocationDto } from 'src/modules/stock-location/dto';

export class UpdateStockDto {
  @IsOptional()
  @IsString()
  @MaxLength(45)
  batch?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  cost_price?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sale_price?: number;

  @IsOptional()
  @IsUUID()
  supplier_id?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_quantity?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateStockLocationDto)
  stock_location?: UpdateStockLocationDto;
}
