import { configureStore } from "@reduxjs/toolkit";

import { mainListSlice } from "./slices/mainListSlice/mainListSlice";
import { singleElementSlice } from "./slices/singleElementSlice/singleElementSlice";

export const store = configureStore({
  reducer: {
    mainListReducer: mainListSlice.reducer,
    singleElementReducer: singleElementSlice.reducer,
  },
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
