import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { MainListPagination } from ".";

describe("MainListPagination", () => {
  it("renders correctly", () => {
    const props = {
      showingPage: 1,
      canDoNextPage: true,
      onPaginationClick: jest.fn(),
    };
    const { getByText, getByTestId } = render(
      <MainListPagination {...props} />
    );
    expect(getByText("1")).toBeInTheDocument();
    expect(getByTestId("pagination-prev").parentElement).toHaveClass(
      "disabled"
    );
    expect(getByTestId("pagination-next").parentElement).not.toHaveClass(
      "disabled"
    );
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const props = {
      showingPage: 2,
      canDoNextPage: false,
      onPaginationClick: handleClick,
    };
    const { getByTestId } = render(<MainListPagination {...props} />);
    fireEvent.click(getByTestId("pagination-prev"));
    expect(handleClick).toHaveBeenCalledWith(-1);

    fireEvent.click(getByTestId("pagination-next"));
    expect(handleClick).toHaveBeenCalledWith(1);

    expect(getByTestId("pagination-next").parentElement).toHaveClass(
      "disabled"
    );
  });
});
