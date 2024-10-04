import { AxiosResponse } from "axios";
import { apiHelper } from "../api";
import { MetaData } from "@/types/metadata";
import { CityShort } from "@/types/apiTypes";

export const getLocationSSR = (): Promise<
  AxiosResponse<MetaData<CityShort>>
> => {
  return apiHelper(
    "/Event",
    "get-location",
    process.env.MAKER_CODE_FAM!,
    "",
    ""
  );
};
