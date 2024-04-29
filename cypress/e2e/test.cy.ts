//http://www.omdbapi.com/?i=tt3896198&apikey=6424148a

describe('Intercepting omdb call testing', () => {
  it('should intercept omdb request', () => {
    cy.visit("http://localhost:5173/")
    cy.intercept("GET","http://www.omdbapi.com/?i=tt3896198&apikey=6424148a",{body:[{Title:"yeah",Year:"2053"},{Title:"movie",Year:1993}]})
  
  })

})