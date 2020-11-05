import { ApiDataProcessorType } from './types';
import { STATUS_CODE } from '../../consts';

export const isStatusSuccessful = (status: number): boolean =>
  status >= STATUS_CODE.OK && status <= STATUS_CODE.NOT_MODIFIED;

export const getProcessed = (
  data: any,
  processData?: ApiDataProcessorType,
): any => processData?.(data) || data;

export const getUrl = (q: string): string =>
  `https://api.unsplash.com/search/photos?page=1&query=${q}&client_id=rpCZQGUOK9VYv2fWfkuoF-9HnGGT6rlrVdVxW8Hy31Q`;
