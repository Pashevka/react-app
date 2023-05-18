import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNextElements } from "@/api/elements/elements";
import { IListElement } from "@/api/elements/types";

import { GENDER_FILTERS, STATUS_FILERS } from "./constants";

export const mainListSlice = createSlice({
  name: "mainList",
  initialState: {
    allElements: [] as IListElement[],
    isLoading: false,
    hasErrors: false,
    fetchedPages: 0,
    totalElements: 0,
    showingPage: 0,
    selectedGenderFilter: GENDER_FILTERS.empty,
    selectedStatusFilter: STATUS_FILERS.empty,
    searchValue: "",
  },
  reducers: {
    setFetchedPage(state, action: PayloadAction<number>) {
      state.fetchedPages = action.payload;
    },
    setAllElements(state, action: PayloadAction<IListElement[]>) {
      state.allElements = action.payload;
    },
    setShowingPage(state, action: PayloadAction<number>) {
      state.showingPage = action.payload;
    },
    setGenderFilter(state, action: PayloadAction<GENDER_FILTERS>) {
      state.selectedGenderFilter = action.payload;
      state.fetchedPages = 0;
      state.showingPage = 0;
      state.allElements = [];
    },
    setStatusFilter(state, action: PayloadAction<STATUS_FILERS>) {
      state.selectedStatusFilter = action.payload;
      state.fetchedPages = 0;
      state.showingPage = 0;
      state.allElements = [];
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNextElements.pending, state => {
      state.isLoading = true;
      state.hasErrors = false;
    });

    builder.addCase(fetchNextElements.fulfilled, (state, { payload }) => {
      state.allElements.push(...payload.results);
      state.isLoading = false;
      state.fetchedPages += 1;
      state.showingPage += 1;
      state.totalElements = payload.info.count;
    });

    builder.addCase(fetchNextElements.rejected, state => {
      state.hasErrors = true;
      state.isLoading = false;
    });
  },
});

export const mainListSliceActions = mainListSlice.actions;
