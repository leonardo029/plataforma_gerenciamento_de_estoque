import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ActionType } from '../types/action-type';

export class CreateProductAuditDto {
  @IsUUID()
  @IsNotEmpty()
  id_product: string;

  @IsUUID()
  @IsNotEmpty()
  id_user: string;

  @IsEnum(ActionType)
  @IsNotEmpty()
  action: ActionType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
