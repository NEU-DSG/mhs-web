const data = require('../data'); // Import your projects

var pages = []; // Initialize an empty array to store results

data.projects.forEach((project) => {
    // Sets person info 
    const entry_dict = {
        "Initials": project.initials,
        "Name": project.full_name,
        "subpages": [] // Initialize subpages as an empty object
    };

    // Sets page info 
    data.tools.forEach((tool) => {
        entry_dict["subpages"].push({
            'tool': tool.tool,
            'title': tool.title,
            'layout': "visualizations/" + tool.tool + ".njk"
        });
    });

    pages.push(entry_dict);
});

module.exports = pages;