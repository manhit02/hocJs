export interface TeamVoteParam {
  teamID: number;
  quantity: number;
}

export interface PagingParam {
  pageNum: number;
  pageSize: number;
}

export interface AccountVerificationParam {
  fullName: string;
  phone: string;
  idCardNum: string;
  email: string;
  locationID: number;
  locationName: string;
  districtID: number;
  districtName: string;
  wardID: number;
  wardName: string;
  addressDetail: string;
  spinLogID: number;
}
