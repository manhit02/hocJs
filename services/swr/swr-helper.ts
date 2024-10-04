import useSWR, { mutate } from "swr";
import { AxiosConfig } from "@/services/client-side/axios.config";
import { RequestBackend } from "@/types/request";
import moment from "moment";
import { logInfo } from "@/utils/log-helper";
const api = AxiosConfig();

export const swrHelper = (
  url: string,
  func: string,
  makerCode: string,
  data: any
) => {
  return useSWR(
    `${func}-${JSON.stringify(data)}`, // đây là key cho api getAccountLogin thích đặt tên gì tùy ý
    () => {
      const requestInfo = new RequestBackend({
        time: moment().utc().unix(),
        fromIP: "",
        sign: "",
        makerCode,
        func,
        data,
      });
      return api.post(url, requestInfo).then((res) => {
        logInfo("swrHelper", { url, func, makerCode, data }, { res: res.data });
        return res.data;
      });
    },
    {
      dedupingInterval: 1 * 10 * 60 * 1000, // thời gian cache 10 phút
      revalidateOnFocus: false,
      revalidateOnMount: true, // Ngăn SWR gọi lại API khi trang web làm mới
      revalidateOnReconnect: false,
    }
  );
};
