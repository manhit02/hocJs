"use client";
import { ReactNode, useContext, useReducer } from "react";
import reducer, { initState } from "./reducer";
import Context from "./Context";

export default function Provider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initState);

  const updateModalState = (modal: ReactNode) => {
    dispatch({ type: "change_modal", payload: { modal: modal } });
  };

  let setTime1: any;

  let setTime2: any;

  let setTime3: any;
  let setTime4: any;
  let setTime5: any;
  const loadingCallAPI = () => {
    setTime1 = setTimeout(() => {
      dispatch({ type: "loading", payload: { loading: 25 } });
    }, 200);
    setTime2 = setTimeout(() => {
      dispatch({ type: "loading", payload: { loading: 50 } });
    }, 400);
    setTime3 = setTimeout(() => {
      dispatch({ type: "loading", payload: { loading: 75 } });
    }, 600);
    setTime4 = setTimeout(() => {
      dispatch({ type: "loading", payload: { loading: 90 } });
    }, 800);
    setTime5 = setTimeout(() => {
      dispatch({ type: "loading", payload: { loading: 100 } });
    }, 20000);
  };

  const finishLoad = () => {
    clearTimeout(setTime1);
    clearTimeout(setTime2);
    clearTimeout(setTime3);
    clearTimeout(setTime4);
    clearTimeout(setTime5);
    dispatch({ type: "loading", payload: { loading: 100 } });
  };

  const setLogin = () => {
    dispatch({ type: "login", payload: {} });
  };

  const setLogout = () => {
    dispatch({ type: "login", payload: {} });
  };

  const refreshAPI = () => {
    dispatch({ type: "refresh", payload: {} });
  };

  const loadingLoginAPI = (load: boolean) => {
    if (load) {
      dispatch({ type: "loadingLogin", payload: {} });
    } else {
      dispatch({ type: "stopLoadingLogin", payload: {} });
    }
  };

  const value = {
    state,
    updateModalState,
    loadingCallAPI,
    finishLoad,
    setLogin,
    setLogout,
    refreshAPI,
    loadingLoginAPI,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useMyReducer = () => {
  const reducerContext = useContext(Context);
  if (reducerContext === undefined) {
    throw new Error("error");
  }
  return reducerContext;
};
