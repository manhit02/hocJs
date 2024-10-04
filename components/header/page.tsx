"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  accountGetBalance,
  getAccountInfo,
} from "@/services/client-side/account-info/account-info.api";
import { TokenProps } from "@/types/componentTypes";
import appSlice from "@/app/appSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/configure-store";
import { useDispatch } from "react-redux";
import { authHandler } from "@/security/auth-handler";
import { StoreContext } from "@/store";
import React from "react";
import Image from "next/image";
import HeaderSearch from "./HeaderSearch";

type HeaderProps = {
  token?: TokenProps;
};
const Header = ({ token }: HeaderProps) => {
  //auth handler
  authHandler(token);

  const { updateModalState, loadingLoginAPI, setLogin, setLogout } =
    appSlice.actions;
  const { refresh, loadingLogin, modal, isLogin } = useAppSelector(
    (state: RootState) => state.app
  );
  const state = useContext(StoreContext);
  const dispatch = useDispatch();
  const [hrefJS, setHrefJS] = useState(0);
  const [accountname, setAccountName] = useState<any>("");
  const [currentToken, setCurrentToken] = useState<any>("");
  const [crrBalance, setBalance] = useState<number>(0);

  const loginAction = () => {
    setHrefJS(1);
    // @ts-ignore
    return calPopLogin();
  };
  const logoutAction = () => {
    setAccountName("");
    dispatch(setLogout());
    // @ts-ignore
    return Logout();
  };
  useEffect(() => {
    getAccountInfo().then((res) => {
      if (res.data.code > 0) {
        setAccountName(res.data.data);
        dispatch(setLogin());
        loadingLoginAPI(false);
      }
    });
  }, [currentToken]);
  useEffect(() => {
    accountGetBalance().then((res) => {
      if (res && res.data.code > 0) {
        setBalance(res.data.data);
      }
    });
  }, [refresh]);

  useEffect(() => {
    setTimeout(() => {
      const targets = document.querySelectorAll(`[href="javascript:;"]`);
      for (let i = 0; i < targets.length; i++) {
        targets[i].removeAttribute("href");
      }
      setHrefJS(0);
    }, 300);
  }, [hrefJS]);

  return (
    <>
      {state.state.modal}
      {modal ? modal : <></>}
      <header>
        {/* Header Beta */}
        {token && token.beta && (
          <div
            style={{
              width: 128,
              height: 28,
              background: "#E2B04E",
              boxShadow: "#000 0px 0px 7px 1px;",
              position: "fixed",
              inset: 0,
              zIndex: 11,
              color: "white",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            BETA
          </div>
        )}
        {/* Header Beta */}

        {/* Tạo header tại đây */}

        {/* header */}
        {/* {loadingLogin && <SpinLoading color="#59e6ff" width={25} height={25} />} */}
        {!loadingLogin && (accountname ? <>Đã đăng nhập</> : <></>)}
      </header>
      <div
        id="header"
        style={{ zIndex: 999, height: "31px", display: "none" }}
      ></div>
      <div id="LogAndReg"></div>
      <header className="[border-bottom:1px_solid_#ccc] px-4">
        <div className="flex items-center justify-between h-[60px]">
          <div className="">
            <Image
              className=""
              width={118}
              height={42}
              alt=""
              src={`/assets/images/TikTok_logo.png`}
            />
          </div>
          <HeaderSearch />

          {isLogin && (
            <button className="bg-red-500 p-2 px-5 rounded-lg">login</button>
          )}
          {!isLogin && (
            <div className="relative group/mn">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  className="object-cover"
                  width={32}
                  height={32}
                  alt=""
                  src={`/assets/images/TikTok_logo.png`}
                />
              </div>
              <div className="hidden group-hover/mn:flex flex-col absolute top-full right-0 bg-black py-4 rounded-xl w-[290px] after:content">
                <Link href={`/`} className="flex items-center px-4 py-2">
                  asdasdas
                </Link>
                <Link href={`/`} className="flex items-center px-4 py-2">
                  asdasdas
                </Link>
                <Link href={`/`} className="flex items-center px-4 py-2">
                  asdasdas
                </Link>
                <Link href={`/`} className="flex items-center px-4 py-2">
                  asdasdas
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
