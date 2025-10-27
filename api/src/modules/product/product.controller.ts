import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/entities';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  @Inject(ProductService)
  private readonly productService: ProductService;

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.productService.create(createProductDto, user.id);
  }

  @Get()
  findAll(@Query() filters: ProductQueryDto) {
    return this.productService.findAll(filters);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Get(':id')
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productService.findById(id);
  }

  @Delete(':id')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.productService.delete(id, user.id);
  }
}
