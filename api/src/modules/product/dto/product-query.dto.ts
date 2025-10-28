import { IntersectionType } from '@nestjs/mapped-types';
import { FilterProductDto } from './filter-product.dto';
import { PaginationDto } from 'src/common/dto';

export class ProductQueryDto extends IntersectionType(
  FilterProductDto,
  PaginationDto,
) {}
