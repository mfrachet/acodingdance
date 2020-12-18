const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
const sitemapTask = require('./sitemap');

module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
    });

    on('task', {
        lighthouse: lighthouse(), // calling the function is important
        pa11y: pa11y(), // calling the function is important
        sitemap: sitemapTask,
    });
};
