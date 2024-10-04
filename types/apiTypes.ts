export interface AccountInfo {
  AccountName: string;
  FullName: string;
  Phone: string;
  Email: string;
  UserGender: string;
  RegisterDate: string;
  LocationID: number;
  LocationName: string;
  DistrictID: number;
  DistrictName: string;
  WardID: number;
  WardNumber: string;
  AddressDetail: string;
}

export interface AccountVerification {
  accountName: string;
  fullName: string;
  phone: string;
  email: string;
  locationID: number;
  locationName: string;
  districtID: number;
  districtName: string;
  wardID: number;
  wardName: string;
  addressDetail: string;
  logID: number;
}

export interface City {
  locationID: number;
  locationName: string;
  nationalID: number;
  position: number;
  status: number;
  crDatetime: number;
}
export interface District {
  districtID: number;
  districtName: string;
  locationID: number;
  position: number;
  status: number;
  crDatetime: number;
}
export interface Ward {
  districtID: number;
  locationID: number;
  position: number;
  status: number;
  wardID: number;
  wardName: string;
  crDatetime: number;
}
export interface CityShort {
  LocationID: number;
  LocationName: string;
}
export interface SitemapType {
  id: number;
}
export interface NewsItem {
  Idx: number;
  Title: string;
  TitleSeo: string;
  Avatar: string;
  Description: string;
  TimePublic: string;
  Content?: string;
  Author: string;
  Keyswords: string;
  MetaDescription: string;
  Slug: string;
  Category_id: number;
  Category_Name: string;
  Category_Slug: string;
}
