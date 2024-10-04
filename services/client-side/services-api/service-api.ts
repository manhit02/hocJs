import { AxiosConfig } from "@/services/client-side/axios.config";
import { AxiosResponse } from "axios";
import { Data, MetaData } from "@/types/metadata";
import moment from "moment";
import { RequestBackend } from "@/types/request";

import { PagingParam } from "@/types/paramTypes";
import { CityShort } from "@/types/apiTypes";
const api = AxiosConfig();
export const getLocation = (): Promise<AxiosResponse<MetaData<CityShort>>> => {
  const requestInfo = new RequestBackend({
    time: moment().utc().unix(),
    fromIP: "",
    sign: "",
    makerCode: process.env.NEXT_PUBLIC_MAKER_CODE_FAM || "",
    func: "get-location",
    data: "",
  });
  return api.post("/Event", requestInfo);
};
