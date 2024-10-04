import { SWRResponseData, SWRResponseMetaData } from "@/types/response";
import { swrHelper } from "../swr-helper";
import { SWRResponse } from "swr";
import { logInfo } from "@/utils/log-helper";
import { NewsItem } from "@/types/apiTypes";
export const searchArticleSWR = (
  key_search: string,
  cate_id: number,
  page: number,
  page_size: number
): SWRResponseMetaData<NewsItem> => {
  const {
    data: result,
    error,
    isLoading,
  } = swrHelper("/Event", "search", process.env.NEXT_PUBLIC_MAKER_CODE!, {
    key_search,
    cate_id,
    page,
    page_size,
  });
  if (error) {
    logInfo("searchArticleSWR", {}, { error });
  }
  if (result) {
    if (result.code > 0 && result.data) {
      return {
        responseData: result.data,
        isLoading,
      };
    } else {
      return {
        responseData: undefined,
        isLoading,
      };
    }
  } else {
    return {
      responseData: undefined,
      isLoading,
    };
  }
};
