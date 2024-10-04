"use client";
import axios from "axios";
import { logInfo } from "@/utils/log-helper";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
});
export const setToken = (token: string) => {
  if(!token){
    logInfo("setToken", {}, { token });
  }
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
export const AxiosConfig = () => {
  return instance;
};
