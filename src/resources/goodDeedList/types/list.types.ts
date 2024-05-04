import { CreateListDto } from '../dto/create';
import { updateListDto } from '../dto/update';
import { ListEntity } from '../list.entity';

export interface ListResponse extends ListEntity {}
export interface ListDeleteResponse extends Omit<ListEntity, 'id'> {}

export type CreateListPayload = CreateListDto;
export type UpdateListPayload = updateListDto;
