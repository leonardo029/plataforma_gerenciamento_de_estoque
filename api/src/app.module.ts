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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
