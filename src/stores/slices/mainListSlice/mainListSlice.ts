import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNextDogs } from "@/api/dogs/dogs";
import { IDogElement } from "@/api/dogs/types";

export const mainListSlice = createSlice({
  name: "mainList",
  initialState: {
    allDogs: [] as IDogElement[],
    isAllDogsFetching: false,
    hasErrors: false,
    fetchedPages: 0,
    showingPage: 0,
  },
  reducers: {
    setFetchedPage(state, action: PayloadAction<number>) {
      state.fetchedPages = action.payload;
    },
    setShowingPage(state, action: PayloadAction<number>) {
      const page = action.payload;
      if (page === 0) {
        return;
      }
      state.showingPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNextDogs.pending, state => {
      state.isAllDogsFetching = true;
      state.hasErrors = false;
    });

    builder.addCase(fetchNextDogs.fulfilled, (state, { payload }) => {
      state.allDogs.push(...payload);
      state.isAllDogsFetching = false;
      state.fetchedPages += 1;
      state.showingPage += 1;
    });

    builder.addCase(fetchNextDogs.rejected, state => {
      state.hasErrors = true;
    });
  },
});

export const mainListSliceActions = mainListSlice.actions;
