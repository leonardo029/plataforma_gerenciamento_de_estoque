import { IntersectionType } from '@nestjs/mapped-types';
import { FilterProductDto } from './filter-product.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class ProductQueryDto extends IntersectionType(
  FilterProductDto,
  PaginationDto,
) {}
