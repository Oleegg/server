import { omit } from 'lodash';

export const excludeKeys = (target: object, keys: string[]) =>
  omit(target, keys);
