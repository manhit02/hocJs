// import { AxiosConfig } from "@/services/client-side/axios.config";
// import { AxiosResponse } from "axios";
// import { Data, MetaData } from "@/types/metadata";
// import moment from "moment";
// import { RequestBackend } from "@/types/request";

// import {
//   AcccountIvalidParam,
//   AccountChooseVip,
//   AccountGiftParam,
//   CongratulationGetListParam,
//   GiftHistoryListParam,
//   PagingParam,
//   VoteHistoryParam,
// } from "@/types/paramTypes";
// import {
//   AccountInventory,
//   ReceiveGiftHistory,
//   SpinItemInfo,
//   SpinLogInfo,
//   VoteHistory,
// } from "@/types/apiTypes";
// import { AccountInfo } from "@/types/apiTypes";
// import { AccountFullInfoType } from "@/types/componentTypes";
// const api = AxiosConfig();

// //danh sách vật phẩm spin
// export const getSpinItemList = (
//   itemID: number
// ): Promise<AxiosResponse<MetaData<SpinItemInfo>>> => {
//   const requestInfo = new RequestBackend({
//     time: moment().unix(),
//     fromIP: "",
//     sign: "",
//     makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
//     func: "spin-item-get-list",
//     data: { itemID },
//   });
//   return api.post("/Event", requestInfo);
// };
// //danh sách log spin
// export const getSpinLogs = (
//   data: PagingParam
// ): Promise<AxiosResponse<MetaData<SpinLogInfo>>> => {
//   const requestInfo = new RequestBackend({
//     time: moment().unix(),
//     fromIP: "",
//     sign: "",
//     makerCode: process.env.NEXT_PUBLIC_MAKER_CODE || "",
//     func: "spin-log-get-list",
//     data: data,
//   });
//   return api.post("/Event", requestInfo);
// };
