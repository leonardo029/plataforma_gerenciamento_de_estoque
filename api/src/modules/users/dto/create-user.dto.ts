import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto';
import { CreateContactDto } from 'src/modules/contact/dto';

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

  @ValidateNested()
  @Type(() => CreateContactDto)
  contact: CreateContactDto;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
