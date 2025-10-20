import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateNutritionalInformationDto } from 'src/modules/nutritional-information/dto';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  identificationCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsUUID()
  idBrand?: string;

  @IsOptional()
  @IsUUID()
  idCategory?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateNutritionalInformationDto)
  nutritionalInformation: UpdateNutritionalInformationDto;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  unitOfMeasurement?: string;
}
