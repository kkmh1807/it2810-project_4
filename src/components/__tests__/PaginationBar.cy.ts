import PaginationBar from '../PaginationBar.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useMoviesStore } from '@/stores/movies';

setActivePinia(createPinia());

describe('PaginationBar.cy.ts', () => {
  it('pagination ui works', () => {
    cy.mount(PaginationBar);

    const movieStore = useMoviesStore();
    movieStore.movieResponse = { data: [], pageInfo: { currentPage: 1, pageSize: 10, totalPages: 10 } };

    cy.get('[data-cy="next-page"]').click();
    cy.get('.pagination-text').contains('2 of 10');

    cy.get('[data-cy="last-page"]').click();
    cy.get('.pagination-text').contains('10 of 10');

    cy.get('[data-cy="first-page"]').click();
    cy.get('.pagination-text').contains('1 of 10');

    cy.get('[data-cy="next-page"]').click();
    cy.get('.pagination-text').contains('2 of 10');

    cy.get('[data-cy="prev-page"]').click();
    cy.get('.pagination-text').contains('1 of 10');
  });
});
