import { configureStore } from "@reduxjs/toolkit";

import { mainListSlice } from "./slices/mainListSlice/mainListSlice";

export const store = configureStore({
  reducer: {
    mainListReducer: mainListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
