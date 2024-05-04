import { IsNotEmpty } from 'class-validator';

export class updateListDto {
  @IsNotEmpty()
  todo: string;
}
