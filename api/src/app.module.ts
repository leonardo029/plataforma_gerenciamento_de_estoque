import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ContactModule } from './modules/contact/contact.module';
import { AddressModule } from './modules/address/address.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { StateModule } from './modules/state/state.module';
import { CityModule } from './modules/city/city.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { NutritionalInformationModule } from './modules/nutritional-information/nutritional-information.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductAuditModule } from './modules/product-audit/product-audit.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { ShelfModule } from './modules/shelf/shelf.module';
import { SectionModule } from './modules/section/section.module';
import { CorridorModule } from './modules/corridor/corridor.module';
import { StockLocationModule } from './modules/stock-location/stock-location.module';

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
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
