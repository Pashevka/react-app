import { IDogElement } from "@/api/dogs/types";
import { ELEMENTS_PER_PAGE } from "@/constants";
import { RootState } from "@/stores";

export const selectShowedDogs = (state: RootState): IDogElement[] => {
  const page = state.mainListReducer.showingPage - 1;
  return state.mainListReducer.allDogs.slice(
    page * ELEMENTS_PER_PAGE,
    page * ELEMENTS_PER_PAGE + ELEMENTS_PER_PAGE
  );
};
