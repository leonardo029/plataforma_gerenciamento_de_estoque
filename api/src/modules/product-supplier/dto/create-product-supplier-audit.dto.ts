import { IsUUID } from 'class-validator';

export class CreateProductSupplierDto {
  @IsUUID()
  supplier_id: string;

  @IsUUID()
  product_id: string;
}
