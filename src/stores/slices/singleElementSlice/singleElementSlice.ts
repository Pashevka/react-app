import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchCharacter } from "@/api/elements/elements";
import { IListElement, IListElementUrlField } from "@/api/elements/types";
import { IKeyValue } from "@/constants/types";

const initialState = {
  element: null as IListElement | null,
  isLoading: false,
  hasErrors: false
}

export const singleElementSlice = createSlice({
  name: "singleElement",
  initialState,
  reducers: {
    setElement(state, action: PayloadAction<IListElement | null>) {
      state.element = action.payload;
    },
    clear() {
      return { ...initialState }
    },
    setNewData(state, action: PayloadAction<IKeyValue<keyof IListElement>>) {
      if (state.element === null) {
        return
      }
      const target = state.element[action.payload.key]
      const isChangingPrimitiveField = ['string', 'number'].includes(typeof target)

      if (isChangingPrimitiveField) {
        state.element = {
          ...state.element,
          [action.payload.key]: action.payload.value
        };
        return
      }

      state.element = {
        ...state.element,
        [action.payload.key]: {
          ...target as IListElementUrlField,
          name: action.payload.value
        }
      };

    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCharacter.pending, state => {
      state.isLoading = true
    });

    builder.addCase(fetchCharacter.fulfilled, (state, { payload }) => {
      state.element = payload
      state.isLoading = false
    });

    builder.addCase(fetchCharacter.rejected, state => {
      state.isLoading = false
      state.hasErrors = true
    });
  },
});

export const singleElementSliceActions = singleElementSlice.actions;
