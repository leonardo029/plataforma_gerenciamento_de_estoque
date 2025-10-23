import { IsInt, IsPositive, IsUUID, Min } from 'class-validator';

export class RemoveStockDto {
  @IsUUID()
  stock_id: string;

  @IsInt()
  @IsPositive()
  @Min(0)
  stock_quantity: number;
}
