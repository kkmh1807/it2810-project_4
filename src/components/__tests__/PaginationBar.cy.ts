import PaginationBar from '../PaginationBar.vue';
import { createPinia, setActivePinia } from 'pinia';
// import { usePaginationStore } from '@/stores/pagination';
// import { createTestingPinia } from '@pinia/testing';
// import { useMoviesStore } from '@/stores/movies';

setActivePinia(createPinia());

describe('PaginationBar.cy.ts', () => {
  it('pagination ui works', () => {
    cy.mount(PaginationBar);

    // cy.mount(PaginationBar, { global: { plugins: [createTestingPinia({ createSpy: cy.spy })] } });
    // const paginationStore = usePaginationStore();
    // const movieStore = useMoviesStore();
    // // Set mock-data
    // movieStore.movieResponse = { data: [], pageInfo: { currentPage: 1, pageSize: 10, totalPages: 10 } };
    // cy.get('[data-cy="next-page"]').click();
    // expect(paginationStore.nextPage).to.have.been.called;

    cy.get('[data-cy="next-page"]').click();
    cy.get('[data-cy="current-page"]').contains('2 of 0');

    cy.get('[data-cy="last-page"]').click();
    cy.get('[data-cy="current-page"]').contains('0 of 0');

    cy.get('[data-cy="first-page"]').click();
    cy.get('[data-cy="current-page"]').contains('1 of 0');

    cy.get('[data-cy="next-page"]').click();
    cy.get('[data-cy="current-page"]').contains('2 of 0');

    cy.get('[data-cy="prev-page"]').click();
    cy.get('[data-cy="current-page"]').contains('1 of 0');
  });
});
