import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities';
import { ContactRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity])],
  controllers: [],
  providers: [ContactService, ContactRepository],
  exports: [ContactService],
})
export class ContactModule {}
