context('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // https://on.cypress.io/interacting-with-elements
    it('rocks', () => {
        cy.lighthouse();
    });
});
