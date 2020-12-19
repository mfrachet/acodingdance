module.exports = {
    siteMetadata: {
        siteUrl: 'https://mfrachet.github.io',
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-emotion`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/src/posts`,
            },
        },

        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-prismjs`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 720,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-sitemap`,
        'gatsby-plugin-robots-txt',
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://mfrachet.github.io`,
                stripQueryString: true,
            },
        },
    ],
};
