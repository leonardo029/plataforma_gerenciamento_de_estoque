import { IsUUID, IsEnum, IsInt, Min } from 'class-validator';
import { ActionType } from '../types';

export class CreateStockTransactionDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  user_id: string;

  @IsUUID()
  stock_id: string;

  @IsEnum(ActionType)
  action: ActionType;
}
