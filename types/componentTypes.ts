export interface GiftReceived {
  ItemName: string;
  IteamImage: string;
}

export interface AccountFullInfoType {
  AccountName: string;
  AccountID: number;
  AccountNick: string;
  AccountAvatar: string;
  YearPlay: number;
  IsVip: number;
  TotalSpin: number;
  VipStatus: number;
}
export type TokenProps = {
  tokenName: string;
  tokenValue: string;
  beta: string;
};