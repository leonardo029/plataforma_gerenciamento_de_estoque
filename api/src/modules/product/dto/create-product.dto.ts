import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsDefined,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateNutritionalInformationDto } from 'src/modules/nutritional-information/dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  identificationCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsUUID()
  @IsNotEmpty()
  idBrand: string;

  @IsUUID()
  @IsNotEmpty()
  idCategory: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateNutritionalInformationDto)
  nutritionalInformation: CreateNutritionalInformationDto;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  unitOfMeasurement: string;
}
