import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { databaseConfig } from './config';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { CityModule } from './modules/city/city.module';
import { ContactModule } from './modules/contact/contact.module';
import { CorridorModule } from './modules/corridor/corridor.module';
import { NutritionalInformationModule } from './modules/nutritional-information/nutritional-information.module';
import { ProductAuditModule } from './modules/product-audit/product-audit.module';
import { ProductSupplierModule } from './modules/product-supplier/product-supplier.module';
import { ProductModule } from './modules/product/product.module';
import { SectionModule } from './modules/section/section.module';
import { ShelfModule } from './modules/shelf/shelf.module';
import { StateModule } from './modules/state/state.module';
import { StockLocationModule } from './modules/stock-location/stock-location.module';
import { StockTransactionModule } from './modules/stock-transaction/stock-transaction.module';
import { StockModule } from './modules/stock/stock.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => {
        return config;
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        const ds = new DataSource(options);
        await ds.initialize();
        return addTransactionalDataSource(ds);
      },
    }),
    UserModule,
    ContactModule,
    AddressModule,
    StateModule,
    CityModule,
    ProductModule,
    BrandModule,
    CategoryModule,
    NutritionalInformationModule,
    SupplierModule,
    ProductAuditModule,
    AuthModule,
    ShelfModule,
    SectionModule,
    CorridorModule,
    StockLocationModule,
    StockModule,
    StockTransactionModule,
    ProductSupplierModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
