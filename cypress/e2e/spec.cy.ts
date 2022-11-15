// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('can search for and save watched movies', () => {
    cy.visit('/');
    cy.get('.search-input').type('jens');
    cy.get('.search-button').click();
    cy.get('.movie-card').first().click();
    cy.get('[data-cy="eye-unwatched"]').should('exist').first().click();
    cy.get('[data-cy="eye-watched"]').should('exist').first().click();
    cy.get('[data-cy="eye-unwatched"]').should('exist');
  });

  it('can browse different pages of movies', () => {
    cy.visit('/');
    cy.get('.search-input').type('pat');
    cy.get('.search-button').click();
    cy.get('[data-cy="first-page"]').should('be.disabled');
    cy.get('[data-cy="last-page"]').should('not.be.disabled').click();
    cy.get('.pagination-text').contains('4 of 4');
    cy.get('[data-cy="first-page"]').should('not.be.disabled');
    cy.get('[data-cy="last-page"]').should('be.disabled');
  });

  it('can search by Genre', () => {
    cy.visit('/');
    cy.get('.mode-dropdown').select('Genres');
    cy.get('.search-input').select('Action');
    cy.get('.search-button').click();
  });
  it('can sort by IMDB-rating', () => {
    cy.visit('/');
    cy.get('.search-input').type('Green');
    cy.get('.search-button').click();
    cy.get('.rating').first().contains('8.6');
    cy.intercept('POST', 'http://it2810-37.idi.ntnu.no:4000/api').as('sort');
    cy.get('.sorting-group').click();
    cy.wait('@sort');
    cy.get('.rating').first().contains('7.6');
  });
});
