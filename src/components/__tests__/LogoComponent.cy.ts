import LogoComponent from '../LogoComponent.vue';

describe('LogoComponent.cy.ts', () => {
  it('shows slogan when large is true', () => {
    cy.mount(LogoComponent, { props: { large: true } });
    cy.get('.logo-slogan').should('exist');
  });

  it('does not show slogan when large is false', () => {
    cy.mount(LogoComponent, { props: { large: false } });
    cy.get('.logo-slogan').should('not.exist');
  });
});
