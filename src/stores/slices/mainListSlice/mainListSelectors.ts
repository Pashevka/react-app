import { IListElement } from "@/api/elements/types";
import { ELEMENTS_PER_PAGE } from "@/constants";
import { RootState } from "@/stores";

export const selectShowedElements = (state: RootState): IListElement[] => {
  const page = state.mainListReducer.showingPage - 1;
  return state.mainListReducer.allElements.slice(
    page * ELEMENTS_PER_PAGE,
    page * ELEMENTS_PER_PAGE + ELEMENTS_PER_PAGE
  );
};

export const selectCanDoNextPage = (state: RootState): boolean => {
  const { allElements, totalElements, showingPage, fetchedPages } = state.mainListReducer
  return allElements.length < totalElements || showingPage < fetchedPages * 2 - 1

}