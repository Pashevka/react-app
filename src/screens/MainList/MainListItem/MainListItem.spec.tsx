// src/MainListItem.test.tsx

import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { MainListItem } from ".";

describe("MainListItem", () => {
  const element = {
    id: 1,
    name: "Test Element",
    status: "Alive",
    species: "Test Species",
    type: "Test Type",
    gender: "Test Gender",
    origin: {
      name: "Test Origin",
      url: "https://example.com/origin",
    },
    location: {
      name: "Test Location",
      url: "https://example.com/location",
    },
    image: "https://example.com/image.jpg",
    episode: ["https://example.com/episode/1", "https://example.com/episode/2"],
    url: "https://example.com/element/1",
    created: "2022-01-01T00:00:00.000Z",
  };

  it("renders correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainListItem element={element} />
      </MemoryRouter>
    );
    expect(getByTestId("main-list-item-name")).toBeInTheDocument();
    expect(getByTestId("main-list-item-name")).toHaveTextContent(element.name);

    expect(getByTestId("main-list-item-other")).toBeInTheDocument();
    expect(getByTestId("main-list-item-other")).toHaveTextContent(
      element.species
    );
    expect(getByTestId("main-list-item-other")).toHaveTextContent(
      element.gender
    );
    expect(getByTestId("main-list-item-other")).toHaveTextContent(
      element.location.name
    );
  });

  it("renders the correct link", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainListItem element={element} />
      </MemoryRouter>
    );
    expect(getByTestId("main-list-item-link")).toHaveAttribute(
      "href",
      "/list/1"
    );
  });

  it("renders the correct image", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainListItem element={element} />
      </MemoryRouter>
    );
    expect(getByTestId("main-list-item-image")).toHaveAttribute(
      "src",
      element.image
    );
  });
});
