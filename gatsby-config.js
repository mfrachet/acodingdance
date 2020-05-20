require(`dotenv`).config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteTitle: "Just a blog",
    siteTitleAlt: "Just a blog",
    siteHeadline: "Just a blog",
    siteUrl: `https://mfrachet.github.io/`,
    siteDescription:
      "A product engineer journey across the world of JavaScript applications",
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/me.jpg`,
    author: `@mfrachet`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        feedTitle: "Just a blog",
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/mfrachet`,
          },
          {
            name: `Github`,
            url: `https://github.com/mfrachet`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Just a blog`,
        short_name: `my-journey`,
        description: `Talking of my daily work and job`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
};
