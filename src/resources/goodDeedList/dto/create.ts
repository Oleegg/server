import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  todo: string;
}
