import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  nickname?: string;

  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  newPassword?: string;
}
