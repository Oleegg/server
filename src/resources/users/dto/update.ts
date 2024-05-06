import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsArray,
} from 'class-validator';

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

  @IsOptional()
  @IsArray()
  list?: string[];

  @IsOptional()
  @IsArray()
  friend?: string[];
}
