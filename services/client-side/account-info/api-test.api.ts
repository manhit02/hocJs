import { AxiosConfig } from "@/services/client-side/axios.config";
import { AxiosResponse } from "axios";
const api = AxiosConfig();
export const getApiUserTikTok = (data: {
  q: string;
  type: string;
}): Promise<AxiosResponse<any>> => {
  return api.get(`/users/search`, {
    params: {
      q: data.q,
      type: data.type,
    },
  });
};
