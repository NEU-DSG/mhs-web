const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {

  const data = require("./src/_data/data.js");

  // Create the JSON file for use by the menu
  eleventyConfig.on("eleventy.before", () => {
    const outputPath = path.join(__dirname, "_site", "data", "menudata.json");

    // Write JSON
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/JsScripts/**/*");
  eleventyConfig.addPassthroughCopy("src/images/**/*");
  eleventyConfig.addPassthroughCopy("src/styles/**/*");
  eleventyConfig.addPassthroughCopy("src/data/**/*");


  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
