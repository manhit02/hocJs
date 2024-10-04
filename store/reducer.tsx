import { ReactNode } from "react";

interface reducerState {
  modal: ReactNode;
  refresh: boolean;
  isLogin: boolean;
  loadingLogin: boolean;
  loading: number;
}
export const initState: reducerState = {
  modal: <></>,
  loading: 0,
  isLogin: false,
  refresh: true,
  loadingLogin: true,
};
function reducer(state: reducerState, action: any) {
  const { type, payload } = action;
  if (type === "change_modal") {
    return {
      ...state,
      modal: payload.modal,
    };
  }
  if (type === "loading") {
    return {
      ...state,
      loading: payload.loading,
    };
  }
  if (type === "login") {
    return {
      ...state,
      isLogin: true,
    };
  }
  if (type === "logout") {
    return {
      ...state,
      isLogin: false,
    };
  }
  if (type === "refresh") {
    return {
      ...state,
      refresh: !state.refresh,
    };
  }
  if (type === "loadingLogin") {
    return {
      ...state,
      loadingLogin: true,
    };
  }
  if (type === "stopLoadingLogin") {
    return {
      ...state,
      loadingLogin: false,
    };
  }
  throw Error("Unknown action.");
}

export default reducer;
