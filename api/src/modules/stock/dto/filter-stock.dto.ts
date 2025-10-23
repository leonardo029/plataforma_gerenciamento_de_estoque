import { IsOptional, IsString } from 'class-validator';

export class FilterStockDto {
  @IsOptional()
  @IsString()
  id?: string;
}
