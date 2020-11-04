import { API_KEY, STATUS_CODE } from '../consts';
import { ApiDataProcessorType } from './types';

export const isStatusSuccessful = (status: number): boolean =>
  status >= STATUS_CODE.OK && status <= STATUS_CODE.NOT_MODIFIED;

export const getUrl = (url: string): string => `${url}&key=${API_KEY}`;

export const getProcessed = (
  data: any,
  processData?: ApiDataProcessorType,
): any => processData?.(data) || data;
