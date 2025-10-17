import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateNutritionalInformationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  portion: string;

  @IsOptional()
  @IsInt()
  carbohydrate?: number;

  @IsOptional()
  @IsInt()
  protein?: number;

  @IsOptional()
  @IsInt()
  totalFat?: number;

  @IsOptional()
  @IsInt()
  fiber?: number;

  @IsBoolean()
  isAllergenic: boolean;
}
