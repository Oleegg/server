import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
