import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { ContactModule } from '../contact/contact.module';
import { AddressModule } from '../address/address.module';
import { UserRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ContactModule,
    AddressModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
