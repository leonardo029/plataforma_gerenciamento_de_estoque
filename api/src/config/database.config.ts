import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const databaseConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => {
    return {
      name: 'default',
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: false,
    };
  },
);

export const connectionSource = new DataSource(
  databaseConfig() as DataSourceOptions,
);
