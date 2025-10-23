import { IsUUID } from 'class-validator';

export class CreateStockLocationDto {
  @IsUUID()
  shelf_id: string;

  @IsUUID()
  corridor_id: string;

  @IsUUID()
  section_id: string;
}
