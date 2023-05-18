import { render } from "@testing-library/react";
import { useSelector } from "react-redux";

import AppLoader from ".";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
const useSelectorMock = useSelector as jest.Mock;
describe("AppLoader", () => {
  it("renders correctly when loadingFlags is empty", () => {
    useSelectorMock.mockReturnValue([]);
    const { container } = render(<AppLoader />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders correctly when loadingFlags has one true value", () => {
    useSelectorMock.mockReturnValue([false, true]);
    const { getByRole } = render(<AppLoader />);
    expect(getByRole("status")).toBeInTheDocument();
  });

  it("renders correctly when loadingFlags has multiple true values", () => {
    useSelectorMock.mockReturnValue([true, true]);
    const { getByRole } = render(<AppLoader />);
    expect(getByRole("status")).toBeInTheDocument();
  });

  it("does not render when all loadingFlags are false", () => {
    useSelectorMock.mockReturnValue([false, false]);
    const { container } = render(<AppLoader />);
    expect(container).toBeEmptyDOMElement();
  });
});
