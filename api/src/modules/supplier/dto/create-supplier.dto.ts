import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MaxLength,
  IsNotEmpty,
  ValidateNested,
  IsDefined,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto';
import { CreateContactDto } from 'src/modules/contact/dto';

export class CreateSupplierDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsBoolean()
  isActivated: boolean;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateContactDto)
  contact: CreateContactDto;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
