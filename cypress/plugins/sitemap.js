const { join } = require('path');
const parseStringPromise = require('xml2js').parseStringPromise;
const fs = require('fs');

const sitemapTask = async ({ path }) => {
    const filepath = join(process.cwd(), path, 'sitemap.xml');
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const json = await parseStringPromise(fileContent);
    const urls = json.urlset.url.map((uri) => uri.loc[0].replace(`https://mfrachet.github.io`, ``));

    return Promise.resolve(urls);
};

module.exports = sitemapTask;
