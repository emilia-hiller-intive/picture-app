import axios, { AxiosInstance } from 'axios';
import { FetchDataType, RequestDataParamsType } from './types';
import { getProcessed, getUrl, isStatusSuccessful } from './helpers';

const request = async <T, U = T>({
  url,
  processData,
}: RequestDataParamsType): Promise<FetchDataType<U>> => {
  let response;

  const api = axios.create() as AxiosInstance;

  try {
    response = await api(url);

    const { data, status } = response;

    if (isStatusSuccessful(status)) {
      return {
        data: getProcessed(data, processData),
        isPending: false,
        isError: false,
      };
    }

    return {
      data: {} as U,
      isPending: false,
      isError: true,
    };
  } catch (e) {
    return {
      data: {} as U,
      isPending: false,
      isError: true,
    };
  }
};

export default {
  request,
};
