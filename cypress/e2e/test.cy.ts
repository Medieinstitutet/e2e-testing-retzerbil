//http://www.omdbapi.com/?i=tt3896198&apikey=6424148a

describe('Intercepting omdb call testing', () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it('should intercept omdb request', () => {
    cy.intercept("http://omdbapi.com/*",
      {
        Search: [
          { Title: "yeah", Year: "2053", imdbID: "15", Type: "movie", Poster: "google.com" },
          { Title: "movie", Year: "1993", imdbID: "15", Type: "movie", Poster: "google.com" }]
      })

    cy.get("#searchText").type("yeah{enter}");

    cy.get(".movie").should("have.length", 2);
    cy.get(".movie > h3:first").should("have.text", "yeah");
  });

  it("should not show error when api connection fails", () => {
    cy.intercept("http://omdbapi.com/*", {
      Body: [
        { Title: "DU SUGER" }, { Title: "hahahahah" }
      ],
      statusCode: 500
    })

    cy.get("#searchText").type("yeah{enter}");
    cy.get("p").should("have.text", "Inga sökresultat att visa")
  })


  it("should display error if movie doesnt exist", () => {
    cy.intercept("http://omdbapi.com/*", { Body: [{}, {}] })

    cy.get("#searchText").type("thismoviedoesntexisthahaha{enter}");
    cy.get("p").should("have.text", "Inga sökresultat att visa");
  })


  it("should display an error if movietitle is empty", () => {
    cy.intercept("http:/omdbapi.com/*", { Body: [{}, {}] })

    cy.get("#searchText").type("{enter}");
    cy.get("#searchText").should("be.empty");
    cy.get("p").should("have.text", "Inga sökresultat att visa");

  })
});