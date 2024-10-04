"use server";

import { ServerRequestBackend } from "@/types/request";
import moment from "moment";

import crypto from "crypto";
import { logError, logInfo } from "@/utils/log-helper";
import axios, { AxiosResponse } from "axios";
import { createHttpAgent } from "@/http/temporal-loom";
import { requireAuth } from "./authen";
export const apiHelper = async (
  url: string,
  func: string,
  makerCode: string,
  data: any,
  fromIP?: string
) => {
  let res = {} as AxiosResponse;

  const token_info = await requireAuth();
  const full_path = process.env.API_BACKEND + url;
  const requestInfo = new ServerRequestBackend({
    time: moment().utc().unix(),
    sign: "",
    makerCode: makerCode,
    func: func,
    data: data,
    fromIP: fromIP || "",
  });
  const key = `${requestInfo.time}${requestInfo.makerCode}${requestInfo.func}${process.env.BACKEND_KEYSIGN}`;
  const api_sign = crypto.createHash("sha256").update(key).digest("hex");
  requestInfo.sign = api_sign;
  try {
    res = await axios.post(full_path, requestInfo, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token_info.tokenValue}`,
      },
      httpAgent: createHttpAgent(),
    });

    logInfo(
      "apiHelper",
      { full_path, requestInfo, key, token: token_info.tokenValue },
      {
        HTTP_STATUS: res.status,
        STATUS_TEXT: res.statusText,
        code: res.data.code,
        mess: res.data.mess,
      }
    );
  } catch (error) {
    logError(
      "apiHelper",
      { full_path, requestInfo, key, token: token_info.tokenValue },
      { error }
    );
  }
  return res;
};
