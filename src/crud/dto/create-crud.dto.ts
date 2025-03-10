import { IsString, IsEmail } from 'class-validator';

export class CreateCrudDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
