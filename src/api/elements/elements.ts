import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/stores";
import {
  GENDER_FILTERS,
  STATUS_FILERS,
} from "@/stores/slices/mainListSlice/constants";

import { IFetchNextElementsRT, IListElement } from "./types";

export const fetchNextElements = createAsyncThunk<
  IFetchNextElementsRT,
  {
    page: number;
    gender?: GENDER_FILTERS;
    status?: STATUS_FILERS;
    searchString?: string;
  },
  { state: RootState }
>("elements/fetchAll", async (args, thunkApi) => {
  let customGender = args.gender as string;
  if (customGender === GENDER_FILTERS.empty || !customGender) {
    customGender = "";
  }

  let customStatus = args.status as string;
  if (customStatus === STATUS_FILERS.empty || !customStatus) {
    customStatus = "";
  }

  let customSearchString = args.searchString as string;
  if (!customSearchString) {
    customSearchString = "";
  }
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${args.page}&gender=${customGender}&status=${customStatus}&name=${customSearchString}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  await sleep(500);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch elements.",
    });
  }

  const json = (await response.json()) as IFetchNextElementsRT;
  return json;
});

export const fetchCharacter = createAsyncThunk<
  IListElement,
  number | string,
  { state: RootState }
>("elements/fetchCharacter", async (id, thunkApi) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  await sleep(1000);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch elements.",
    });
  }

  const json = (await response.json()) as IListElement;
  return json;
});

const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
