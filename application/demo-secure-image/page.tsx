"use client";


import { RootState } from "@/redux/configure-store";
import { useAppSelector } from "@/redux/hooks";
import Template from "@/components/common/Template/Template";
import LayoutFacebook from "@/components/common/Facebook/LayoutFacebook";

import { searchArticleSWR } from "@/services/swr/service-api/service-api";
import { useEffect, useState } from "react";
import { sendGTMEvent, YouTubeEmbed, GoogleMapsEmbed } from '@next/third-parties/google'
import Image from "next/image";
import SecureImage from "@/components/Image/SecureImage";
import moment from 'moment-timezone';
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
    sendGTMEvent({ event: 'buttonClicked', value: e.target.value })
    setTimeout(() => {
      setSearchKey(e.target.value);
    }, 500);
  };
  return (
    <main className="text-black">
      {modal ? modal : <></>}
      {/* phần Template này để demo, mọi người hãy xóa đi khi bắt đầu dựng html */}
      <Template />
      <LayoutFacebook appID="appIDFacebook" />
      <Image
        width={2560}
        height={1000}
        alt="Fast Image"
        src={"https://au.vtc.vn/media/media/images/images/Anh%20Banner/2-4-2024-au-april-2560x1000.png"}
      />
      <SecureImage
        width={2560}
        height={1000}
        alt="Secure Image"
        src={"https://au.vtc.vn/media/media/images/images/Anh%20Banner/2-4-2024-au-april-2560x1000.png"}
        startTime={moment().tz('Asia/Bangkok').unix()}
        endTime={moment().tz('Asia/Bangkok').add(1,"days").unix() } // Ví dụ cộng mẫu 1 ngày
      />
      <div className="flex items-center h-[40px] w-full max-w-[300px] mr-[16px] my-[16px] rounded-[20px] lg:mx-0 bg-transparent border-2 border-solid border-[#FBC12B]">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm"
          className="flex-1 bg-transparent !border-none focus:outline-none px-[16px] text-black placeholder:text-black"
          onChange={handleSearch}
        />
      </div>
      <div className="m-5 flex flex-col">
        <div>
          {articleDataLoading ? (
            <h1 className="m-5">Loading.....</h1>
          ) : (
            <div className="m-5">
              {articleData ? (
                <>
                  <ul>
                    {articleData.list.map((e, i) => (
                      <>
                        <li key={`li_${i}`}>
                          <h2 key={`h2_${i}`}> - {e.Title}</h2>
                        </li>
                      </>
                    ))}
                  </ul>
                </>
              ) : (
                "Chưa có dữ liệu"
              )}
            </div>
          )}
          <div className="flex gap-5 pl-5">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Prev
            </button>
            <h1>{page}</h1>
            <button
              onClick={() => {
                if (page < totalPage) {
                  setPage(page + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="m-5">
          <YouTubeEmbed videoid="TX9qSaGXFyg" height={400} params="controls=0" />
        </div>
        <div className="m-5">
          <GoogleMapsEmbed
            apiKey="XYZ"
            height={200}
            width={400}
            mode="place"
            q="Brooklyn+Bridge,New+York,NY" style={""} allowfullscreen={false} loading={"eager"} />
        </div>

      </div>

      {/*  */}
    </main>
  );
}
