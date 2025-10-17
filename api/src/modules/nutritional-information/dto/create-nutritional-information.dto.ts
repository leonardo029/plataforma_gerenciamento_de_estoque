import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateNutritionalInformationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  portion: string;

  @IsOptional()
  @IsNumber()
  carbohydrate?: number;

  @IsOptional()
  @IsNumber()
  protein?: number;

  @IsOptional()
  @IsNumber()
  totalFat?: number;

  @IsOptional()
  @IsNumber()
  fiber?: number;

  @IsBoolean()
  isAllergenic: boolean;
}
