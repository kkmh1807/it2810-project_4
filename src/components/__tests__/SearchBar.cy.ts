import { createPinia, setActivePinia } from 'pinia';
import SearchBar from '../SearchBar.vue';

setActivePinia(createPinia());

describe('SearchBar.cy.ts', () => {
  it('mounts correctly', () => {
    cy.intercept('POST', 'http://it2810-37.idi.ntnu.no:4000/api', (req) =>
      req.reply({
        data: {
          genres: ['Adventure', 'Horror', 'Comedy']
        }
      })
    ).as('getGenres');

    cy.mount(SearchBar);
    cy.wait('@getGenres');

    cy.get('input.search-input').should('have.attr', 'placeholder', 'Search for movies...');

    cy.get('.mode-dropdown').should('have.value', 'ALL').select('GENRE');
    cy.get('select.search-input').should('exist');
    cy.get('input.search-input').should('not.exist');
  });
});
