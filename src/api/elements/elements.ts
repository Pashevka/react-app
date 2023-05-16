import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/stores";

import { GENDER_FILTERS, STATUS_FILERS } from "@/stores/slices/mainListSlice/constants";
import { IFetchNextElementsRT } from "./types";

export const fetchNextElements = createAsyncThunk<
  IFetchNextElementsRT,
  {
    page: number,
    gender?: GENDER_FILTERS
    status?: STATUS_FILERS
    searchString?: string
  },
  { state: RootState }
>("elements/fetchAll", async (args, thunkApi) => {
  let customGender = args.gender as string
  if (customGender === GENDER_FILTERS.empty || !customGender) {
    customGender = ''
  }

  let customStatus = args.status as string
  if (customStatus === STATUS_FILERS.empty || !customStatus) {
    customStatus = ''
  }

  let customSearchString = args.searchString as string
  if (!customSearchString) {
    customSearchString = ''
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

  // Check if status is not okay:
  if (response.status !== 200) {
    // Return the error message:
    return thunkApi.rejectWithValue({
      message: "Failed to fetch elements.",
    });
  }

  const json = await response.json() as IFetchNextElementsRT;
  return json
});
