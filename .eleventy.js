module.exports = function (eleventyConfig) {

  // Pass through these directories and any sibdirectories
  eleventyConfig.addPassthroughCopy("src/data/**/*");
  eleventyConfig.addPassthroughCopy("src/JsScripts/**/*");
  eleventyConfig.addPassthroughCopy("src/images/**/*");
  eleventyConfig.addPassthroughCopy("src/styles/**/*");

  return {
    dir: {
      input: "src",   // Input folder
      output: "_site",  // Output folder
      includes: "_includes"  // Folder for templates and includes
    }
  };
};
