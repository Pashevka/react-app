import { fireEvent, render } from "@testing-library/react";
import React from "react";

import {
  GENDER_FILTERS,
  STATUS_FILERS,
} from "@/stores/slices/mainListSlice/constants";

import { MainListSelectFilters } from ".";

describe("MainListSelectFilters", () => {
  it("should render the status select field", () => {
    const { getByTestId } = render(
      <MainListSelectFilters
        onGenderSelectChange={jest.fn()}
        onStatusSelectChange={jest.fn()}
      />
    );
    const select = getByTestId("main-list-status-select");
    expect(select).toBeInTheDocument();
  });

  it("should render the gender select field", () => {
    const { getByTestId } = render(
      <MainListSelectFilters
        onGenderSelectChange={jest.fn()}
        onStatusSelectChange={jest.fn()}
      />
    );
    const select = getByTestId("main-list-status-gender");
    expect(select).toBeInTheDocument();
  });

  it("should call onStatusSelectChange when status select value changes", () => {
    const onStatusSelectChange = jest.fn();
    const { getByTestId } = render(
      <MainListSelectFilters
        onGenderSelectChange={jest.fn()}
        onStatusSelectChange={onStatusSelectChange}
      />
    );
    const select = getByTestId("main-list-status-select");
    fireEvent.change(select, { target: { value: STATUS_FILERS.alive } });
    expect(onStatusSelectChange).toHaveBeenCalled();
  });

  it("should call onGenderSelectChange when gender select value changes", () => {
    const onGenderSelectChange = jest.fn();
    const { getByTestId } = render(
      <MainListSelectFilters
        onGenderSelectChange={onGenderSelectChange}
        onStatusSelectChange={jest.fn()}
      />
    );
    const select = getByTestId("main-list-status-gender");
    fireEvent.change(select, { target: { value: GENDER_FILTERS.female } });
    expect(onGenderSelectChange).toHaveBeenCalled();
  });
});
