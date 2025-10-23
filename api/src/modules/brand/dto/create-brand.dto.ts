import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;
}
