context('Home', () => {
    it('verify all the pages shapes', () => {
        cy.task('sitemap', { path: 'public' }).then((urls) => {
            urls.forEach((url) => {
                cy.visit(url);
                cy.url().should('contain', url);

                cy.lighthouse({
                    performance: 90,
                    accessibility: 100,
                    'best-practices': 90,
                    seo: 90,
                    pwa: 0,
                });
            });
        });
    });
});
