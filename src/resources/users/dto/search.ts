import { IsNotEmpty } from 'class-validator';

export class SearchUserDto {
  @IsNotEmpty()
  nick: string;
}
