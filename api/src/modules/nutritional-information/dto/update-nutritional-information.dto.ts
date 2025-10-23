import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionalInformationDto } from './create-nutritional-information.dto';

export class UpdateNutritionalInformationDto extends PartialType(
  CreateNutritionalInformationDto,
) {}
