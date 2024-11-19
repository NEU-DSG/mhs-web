const data = require('../data');

// Process projects and tools, and merge custom parameters dynamically
const subpages = data.projects.reduce((acc, project) => {
    data.tools.forEach((tool) => {
        // Find custom parameters for this project and tool
        const custom = data.custom_params.find(
            (param) => param.project === project.initials && param.tool === tool.tool
        );

        // Create a subpage object and attach custom params if they exist
        const subpage = {
            initials: project.initials,
            name: project.full_name,
            tool: tool.tool,
            title: tool.title,
            layout: `visualizations/${tool.tool}.njk`,
            params: custom ? custom.params : {}, // Attach params dynamically
        };

        // Push the subpage data into the accumulator
        acc.push(subpage);
    });
    return acc;
}, []);

// Export the list of subpages
module.exports = subpages;
