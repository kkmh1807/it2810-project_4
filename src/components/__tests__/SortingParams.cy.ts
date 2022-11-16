import { createPinia, setActivePinia } from 'pinia';
import SortingParams from '../SortingParams.vue';

setActivePinia(createPinia());

describe('MovieCard.cy.ts', () => {
  it('opens and closes when clicked', () => {
    cy.mount(SortingParams);

    cy.get('[data-cy="desc-arrow"]').should('exist');
    cy.get('[data-cy="asc-arrow"]').should('not.exist');
    cy.get('.sorting-group').click();
    cy.get('[data-cy="desc-arrow"]').should('not.exist');
    cy.get('[data-cy="asc-arrow"]').should('exist');
  });
});
