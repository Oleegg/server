import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(3)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
