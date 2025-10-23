import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  ValidateNested,
  IsDefined,
  IsObject,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto';
import { CreateContactDto } from 'src/modules/contact/dto';
import { UserRoleType } from '../types';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

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

  @IsEnum(UserRoleType)
  action: UserRoleType;
}
