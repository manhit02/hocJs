import { AxiosConfig } from "@/services/client-side/axios.config";
import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import moment from "moment";
import { RequestBackend } from "@/types/request";

import { PagingParam } from "@/types/paramTypes";
import { AccountVerification } from "@/types/apiTypes";
import { AccountInfo } from "@/types/apiTypes";
import { AccountFullInfoType } from "@/types/componentTypes";
const api = AxiosConfig();

export const getAccountInfo = (): Promise<AxiosResponse<any>> => {
  const requestInfo = new RequestBackend({
    time: moment().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
    func: "",
    data: "",
  });
  return api.post("/UserInfo", requestInfo);
};
export const getFullAccountInfo = (): Promise<
  AxiosResponse<Data<AccountFullInfoType>>
> => {
  const requestInfo = new RequestBackend({
    time: moment().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
    func: "account-get-info",
    data: "",
  });
  return api.post("/Event", requestInfo);
};

export const getAccountLogin = (): Promise<AxiosResponse<MetaData<any>>> => {
  const requestInfo = new RequestBackend({
    time: moment().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
    func: "account-login",
    data: "",
  });
  return api.post("/Event", requestInfo);
};

export const accountGetBalance = (): Promise<AxiosResponse<Data<any>>> => {
  const requestInfo = new RequestBackend({
    time: moment().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
    func: "account-balance",
    data: "",
  });
  return api.post("/Event", requestInfo);
};
export const accountVerificationGetInfo = (): Promise<
  AxiosResponse<Data<any>>
> => {
  const requestInfo = new RequestBackend({
    time: moment().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
    func: "account-verification-get-info",
    data: "",
  });
  return api.post("/Event", requestInfo);
};
