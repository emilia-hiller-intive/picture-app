export interface FetchDataType<T> {
  data: T;
  isPending?: boolean;
  isError?: boolean;
}

export type ApiDataProcessorType = (data: any) => any;

export interface RequestDataParamsType {
  url: string;
  processData?: ApiDataProcessorType;
}
