module.exports = function(eleventyConfig) {
    // Pass through "styles" and "images" folders to the output folder
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/JsScripts");
    eleventyConfig.addPassthroughCopy("src/data");

    
    
  
    return {
        dir: {
          input: "src",
          output: "_site",
          includes: "_includes"
        }
      };
    };