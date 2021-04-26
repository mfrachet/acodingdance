const CleanCSS = require("clean-css");
const format = require("date-fns/format");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const toReadableDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://mfrachet.github.io",
    },
  });

  eleventyConfig.addLayoutAlias("posts", "layouts/posts.njk");
  eleventyConfig.addPassthroughCopy("./blog/**/*.png");
  eleventyConfig.addPassthroughCopy("./blog/**/*.jpg");
  eleventyConfig.addPassthroughCopy("./blog/**/*.mp4");

  eleventyConfig.addNunjucksFilter("readableDate", toReadableDate);

  eleventyConfig.addFilter(
    "cssmin",
    (code) => new CleanCSS({}).minify(code).styles
  );

  return {};
};
