import { IListElement } from "@/api/elements/types";
import { ELEMENTS_PER_PAGE } from "@/constants";
import { IKeyValue } from "@/constants/types";
import { RootState } from "@/stores";

export const selectAllInfoElements = (state: RootState): IKeyValue<keyof IListElement>[] => {
  if (!state.singleElementReducer.element) {
    return []
  }
  const { name, status, species, gender, origin, location } = state.singleElementReducer.element
  return [
    {
      key: 'name',
      value: name
    },
    {
      key: 'status',
      value: status
    },
    {
      key: 'species',
      value: species
    },
    {
      key: 'gender',
      value: gender
    },
    {
      key: 'origin',
      value: origin.name
    },
    {
      key: 'location',
      value: location.name
    }
  ]
}