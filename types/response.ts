import { DataT } from "./metadata";

export interface SWRResponseData<T> {
  responseData: T | undefined;
  isLoading: boolean;
}
export interface SWRResponseMetaData<T> {
  responseData: DataT<T> | undefined;
  isLoading: boolean;
}
