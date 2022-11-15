import { createPinia, setActivePinia } from 'pinia';
import WatchEye from '../WatchEye.vue';

setActivePinia(createPinia());

describe('WatchEye.cy.ts', () => {
  it('sends request when clicked', () => {
    cy.intercept('POST', 'http://it2810-37.idi.ntnu.no:4000/api', (req) =>
      req.reply({
        data: {
          watched: true
        }
      })
    ).as('toggleWatched');

    cy.mount(WatchEye, { props: { watched: false, movieId: '123' } });
    cy.get('[data-cy="eye-unwatched"]').should('exist');

    cy.get('[data-cy="eye-unwatched"]').click();
    cy.wait('@toggleWatched');
  });

  it('eye changes when prop is true', () => {
    cy.mount(WatchEye, { props: { watched: true, movieId: '123' } });
    cy.get('[data-cy="eye-watched"]').should('exist');
  });
});
