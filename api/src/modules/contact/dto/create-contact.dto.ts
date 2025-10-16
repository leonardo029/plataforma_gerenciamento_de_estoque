import { IsInt, IsString, Length, Min } from 'class-validator';

export class CreateContactDto {
  @IsInt()
  @Min(1)
  country_code: number;

  @IsInt()
  @Min(1)
  ddd: number;

  @IsString()
  @Length(1, 15)
  phone_number: string;
}
