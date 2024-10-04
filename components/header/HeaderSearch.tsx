"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { getApiUserTikTok } from "@/services/client-side/account-info/api-test.api";
export default function HeaderSearch() {
  const [dText, setDText] = useState("");
  const [searchValue, setSearchValue] = useState<any>([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (query) {
      setLoading(true);
      getApiUserTikTok({ q: dText, type: "less" }).then((res) => {
        setSearchValue(res.data.data);
        setLoading(false);
      });
    }
  }, [query]);
  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      if (dText) {
        setQuery(encodeURIComponent(dText));
      }
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [dText]);
  const handleChange = (e: any) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) setDText(searchValue);
  };
  return (
    <>
      <div className="relative">
        <input
          type="text"
          ref={inputRef}
          className="z-[9] absolute left-0 top-0 outline-none text-black peer h-full w-full pl-5 rounded-3xl bg-transparent"
          placeholder="Tim Kiem"
          onChange={handleChange}
          value={dText}
          onFocus={() => {
            setSearch(true);
          }}
          onBlur={() => {
            setSearch(false);
          }}
        />
        <Tooltip
          className="w-[500px] bg-transparent"
          open={search && dText.length > 0 ? true : false}
          content={
            <>
              <div
                className={`rounded-lg flex-col bg-white shadow-[0px_0px_12px_rgba(0,_0,_0,_0.12)] max-h-[80vh] overflow-hidden overflow-y-auto`}
              >
                {searchValue.map((e: any) => (
                  <Link
                    href={`/thong-tin/${e.nickname}`}
                    key={e.id}
                    className="hover:bg-slate-100 w-full px-4 my-2 flex items-center cursor-pointer"
                  >
                    <img
                      src={e.avatar}
                      alt={e.full_name}
                      className="w-10 h-10 object-cover rounded-[50%] flex-shrink-0 mr-3"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-black flex items-center">
                        {e.full_name || ""}
                        {e.tick && (
                          <svg
                            font-size="14px"
                            viewBox="0 0 48 48"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            className="ml-2"
                          >
                            <g clip-path="url(#Icon_Color-Verified_Badge_svg__a)">
                              <path
                                d="M0 24a24 24 0 1 1 48 0 24 24 0 0 1-48 0Z"
                                fill="#20D5EC"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M37.12 15.88a3 3 0 0 1 0 4.24l-13.5 13.5a3 3 0 0 1-4.24 0l-8.5-8.5a3 3 0 1 1 4.24-4.24l6.38 6.38 11.38-11.38a3 3 0 0 1 4.24 0Z"
                                fill="#fff"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="Icon_Color-Verified_Badge_svg__a">
                                <path fill="#fff" d="M0 0h48v48H0z"></path>
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </h4>
                      <div className="text-sm text-[rgba(22,_24,_35,_0.5)]">
                        {e.nickname || ""}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          }
        >
          <div className="relative [border:1px_solid_#ccc] w-[500px] rounded-3xl h-12  flex items-center justify-end">
            {!!dText && (
              <button
                onClick={() => {
                  setDText("");
                  setSearch(false);
                  inputRef.current?.focus();
                }}
                className=" z-10 cursor-pointer flex-shrink-0 absolute top-1/2 -translate-y-1/2 right-16"
              >
                <svg
                  width="16"
                  data-e2e=""
                  height="16"
                  viewBox="0 0 48 48"
                  fill="rgba(22, 24, 35, .34)"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${loading ? "hidden" : ""}`}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 46C36.1503 46 46 36.1503 46 24C46 11.8497 36.1503 2 24 2C11.8497 2 2 11.8497 2 24C2 36.1503 11.8497 46 24 46ZM15.1466 30.7323L21.8788 24.0001L15.1466 17.2679C14.756 16.8774 14.756 16.2442 15.1466 15.8537L15.8537 15.1466C16.2442 14.756 16.8774 14.756 17.2679 15.1466L24.0001 21.8788L30.7323 15.1466C31.1229 14.756 31.756 14.756 32.1466 15.1466L32.8537 15.8537C33.2442 16.2442 33.2442 16.8774 32.8537 17.2679L26.1214 24.0001L32.8537 30.7323C33.2442 31.1229 33.2442 31.756 32.8537 32.1466L32.1466 32.8537C31.756 33.2442 31.1229 33.2442 30.7323 32.8537L24.0001 26.1214L17.2679 32.8537C16.8774 33.2442 16.2442 33.2442 15.8537 32.8537L15.1466 32.1466C14.756 31.756 14.756 31.1229 15.1466 30.7323Z"
                  ></path>
                </svg>

                <svg
                  width="16"
                  data-e2e=""
                  height="16"
                  viewBox="0 0 48 48"
                  fill="rgba(22, 24, 35, .34)"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${loading ? "" : "hidden"} animate-spin`}
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24 12.5C17.6487 12.5 12.5 17.6487 12.5 24C12.5 30.3513 17.6487 35.5 24 35.5C26.8172 35.5 29.3919 34.4902 31.3919 32.8101C32.4491 31.9219 34.026 32.059 34.9142 33.1161C35.8023 34.1733 35.6653 35.7503 34.6081 36.6384C31.741 39.0471 28.0369 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24C40.5 25.3807 39.3807 26.5 38 26.5C36.6193 26.5 35.5 25.3807 35.5 24C35.5 17.6487 30.3513 12.5 24 12.5Z"
                  ></path>
                </svg>
              </button>
            )}
            <div className="w-[1px] h-[60%] bg-[#ccc] flex-shrink-0"></div>

            <div className="cursor-pointer flex-shrink-0 w-[52px] h-full flex items-center justify-center">
              <svg
                width="24"
                data-e2e=""
                height="24"
                viewBox="0 0 48 48"
                fill="rgba(22, 24, 35, .34)"
                xmlns="http://www.w3.org/2000/svg"
                className="object-contain"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
                ></path>
              </svg>
            </div>
          </div>
        </Tooltip>
      </div>
      {/* {false ? <SpinLoading color="" height={50} width={50} /> : <></>} */}
    </>
  );
}
