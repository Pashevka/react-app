import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { ElementInfoRow } from ".";

describe("ElementInfoRow", () => {
  it("should render the label with the correct name", () => {
    const { getByTestId } = render(
      <ElementInfoRow name="name" value="John Doe" onChangeData={jest.fn()} />
    );
    const label = getByTestId("info-row-name");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("name:");
  });

  it("should render the input field with the correct value", () => {
    const { getByTestId } = render(
      <ElementInfoRow name="name" value="John Doe" onChangeData={jest.fn()} />
    );
    const input = getByTestId("info-row-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("John Doe");
  });

  it("should call onChangeData when input value changes", () => {
    const onChangeData = jest.fn();
    const { getByTestId } = render(
      <ElementInfoRow
        name="name"
        value="John Doe"
        onChangeData={onChangeData}
      />
    );
    const input = getByTestId("info-row-input");
    fireEvent.change(input, { target: { value: "other" } });
    expect(onChangeData).toHaveBeenCalledWith("name", "other");
  });
});
