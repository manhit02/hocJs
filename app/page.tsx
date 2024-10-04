"use client";
import { RootState } from "@/redux/configure-store";
import { useAppSelector } from "@/redux/hooks";
import Template from "@/components/common/Template/Template";
import LayoutFacebook from "@/components/common/Facebook/LayoutFacebook";
import { searchArticleSWR } from "@/services/swr/service-api/service-api";
import { useEffect, useState, useRef } from "react";
import {
  sendGTMEvent,
  YouTubeEmbed,
  GoogleMapsEmbed,
} from "@next/third-parties/google";
import React from "react";
import SideBar from "@/components/sections/sidebar/SideBar";

export default function Home() {
  const modal = useAppSelector((state: RootState) => state.app.modal);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const pageSize = 10;

  const { responseData: articleData, isLoading: articleDataLoading } =
    searchArticleSWR(searchKey, 1, page, pageSize);
  useEffect(() => {
    if (articleData) {
      setTotalPage(Math.floor(articleData.total / pageSize));
    }
  }, [articleData]);
  const handleSearch = (e: any) => {
    sendGTMEvent({ event: "buttonClicked", value: e.target.value });
    setTimeout(() => {
      setSearchKey(e.target.value);
    }, 500);
  };
  return (
    <>
      <SideBar />
    </>
  );
}
