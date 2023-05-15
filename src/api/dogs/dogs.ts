import { createAsyncThunk } from "@reduxjs/toolkit";

import { ELEMENTS_PER_PAGE } from "@/constants";
import { RootState } from "@/stores";

import { IDogElement } from "./types";

export const fetchNextDogs = createAsyncThunk<
  IDogElement[],
  number,
  { state: RootState }
>("dogs/fetchAll", async (page, thunkApi) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/breeds?limit=${ELEMENTS_PER_PAGE}&page=${page}`,
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
      message: "Failed to fetch dogs.",
    });
  }

  return await response.json();
});
