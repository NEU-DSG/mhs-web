const fs = require("fs"); // For file system operations
const path = require("path");

module.exports = function (eleventyConfig) {
  // Import the module.exports data
  const data = require("./src/_data/data.js");

  // Create the JSON file dynamically
  eleventyConfig.on("eleventy.before", () => {
    const outputPath = path.join(__dirname, "_site", "data", "pagedata.json");

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Write the JSON data to the file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("JSON file created at:", outputPath);
  });

  // Other passthrough copies
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
