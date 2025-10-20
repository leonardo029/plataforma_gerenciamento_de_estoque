import {
  IsString,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsInt,
  Length,
  Min,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  street: string;

  @IsUUID()
  @IsNotEmpty()
  idStreetType: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  complement?: string;

  @IsString()
  @Length(8, 8)
  cep: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsString()
  @Length(1, 255)
  neighborhood: string;

  @IsInt()
  @Min(1)
  idCity: number;
}
