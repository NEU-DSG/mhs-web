const data = require('/psc/data'); // Import your projects and tools

// Combine data into a single object
const Btitles = {};

// Populate from projects
data.projects.forEach((project) => {
    Btitles[project.initials] = project.title || project.full_name;
});

// Populate from tools
data.tools.forEach((tool) => {
    Btitles[tool.tool] = tool.title;
});

// Export the combined Btitles object 
module.exports = Btitles;
