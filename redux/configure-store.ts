import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./saga";
import appSlice from "@/app/appSlice";
// const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
