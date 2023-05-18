describe("My First Test", () => {
  // I dont want to intercept each request. Im ok to use it as it is in test project
  beforeEach(() => {
    cy.intercept("GET", "/api/character?page=1&gender=&status=&name=", {
      fixture: "characters.json",
      statusCode: 200,
      delay: 1000,
    }).as("getCharacters");
    cy.visit("/");
    cy.wait("@getCharacters");
  });

  it("should render 10 elements", () => {
    cy.getByTestId("main-list-item-link").should("have.length", 10);
  });

  it("status select should working as expected", () => {
    cy.getByTestId("main-list-status-select").select("Dead");
    cy.getByTestId("main-list-item-name")
      .eq(0)
      .should("have.text", "Adjudicator Rick");
    cy.getByTestId("main-list-item-name")
      .eq(3)
      .should("have.text", "Albert Einstein");
    cy.getByTestId("main-list-item-name").eq(9).should("have.text", "Beebo");
  });

  it("gender select should working as expected", () => {
    cy.getByTestId("main-list-status-gender").select("unknown");
    cy.getByTestId("main-list-item-name")
      .eq(0)
      .should("have.text", "Alien Googah");
    cy.getByTestId("main-list-item-name").eq(3).should("have.text", "Blamph");
    cy.getByTestId("main-list-item-name")
      .eq(9)
      .should("have.text", "Dipper and Mabel Mortys");
  });

  it("search input should working as expected", () => {
    cy.intercept("/api/*").as("apiRequest");
    cy.getByTestId("main-list-search-filter-input").type("summer");
    cy.wait("@apiRequest");
    cy.getByTestId("main-list-item-name")
      .eq(0)
      .should("have.text", "Summer Smith");
    cy.getByTestId("main-list-item-name")
      .eq(2)
      .should("have.text", "Mechanical Summer");
    cy.getByTestId("main-list-search-filter-input").clear();
    cy.getByTestId("main-list-search-filter-input").type(
      "100% without results"
    );
    cy.wait("@apiRequest");
    cy.getByTestId("main-list-item-link").should("have.length", 0);
    cy.getByTestId("main-list-search-filter-input").clear();
    cy.getByTestId("main-list-search-filter-input").type("morty");
    cy.wait("@apiRequest");
    cy.getByTestId("main-list-item-name")
      .eq(0)
      .should("have.text", "Morty Smith");
    cy.getByTestId("main-list-item-name")
      .eq(9)
      .should("have.text", "Campaign Manager Morty");
  });
});

export {};
