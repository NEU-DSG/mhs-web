// Get <header> by id "menu".
const header = document.getElementById('menu');

// Create <link> element for CSS.
const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', '/psc/styles/menu.css');
header.appendChild(link);

// Create <ul> element.
const ul = document.createElement('ul');
ul.setAttribute('class', 'topnav');

// Create HOME link.
const l1 = document.createElement('li');
const homeA = document.createElement('a');
homeA.setAttribute('href', '/psc/index.html');
homeA.setAttribute('class', 'logo');

const homeText = document.createTextNode('Home');
homeA.appendChild(homeText);
l1.appendChild(homeA);
ul.append(l1);

// Fetch JSON data
fetch('/psc/data/menudata.json') // Adjust path as necessary
    .then((response) => response.json())
    .then((data) => {
        // Create first dropdown menu: Projects
        const project = document.createElement('li');
        project.setAttribute('class', 'dropdown');

        const projectA = document.createElement('a');
        projectA.setAttribute('href', '/psc/projects/index.html');
        projectA.setAttribute('class', 'dropbtn');

        const projectAText = document.createTextNode('Projects ');
        const projectArrow = document.createElement('span'); // Arrow indicator
        projectArrow.innerHTML = '&#x25BC;'; // Unicode for downward arrow (▼)
        projectArrow.setAttribute('class', 'dropdown-arrow');

        projectA.append(projectAText, projectArrow);
        project.append(projectA);

        const projectDiv = document.createElement('div');
        projectDiv.setAttribute('class', 'dropdown-content');

        // Dynamically add project links
        data.projects.forEach((projectData) => {
            const projectLink = document.createElement('a');
            projectLink.setAttribute('href', `/psc/projects/${projectData.initials}/index.html`);
            const projectText = document.createTextNode(
                projectData.full_name || projectData.title
            );
            projectLink.appendChild(projectText);
            projectDiv.appendChild(projectLink);
        });

        project.append(projectDiv); // Append dropdown content to Projects
        ul.append(project); // Add Projects to navbar

        // Create second dropdown menu: Tools
        const tools = document.createElement('li');
        tools.setAttribute('class', 'dropdown');

        const toolsA = document.createElement('a');
        toolsA.setAttribute('href', '/psc/tools/index.html');
        toolsA.setAttribute('class', 'dropbtn');

        const toolsAText = document.createTextNode('Tools ');
        const toolsArrow = document.createElement('span'); // Arrow indicator
        toolsArrow.innerHTML = '&#x25BC;'; // Unicode for downward arrow (▼)
        toolsArrow.setAttribute('class', 'dropdown-arrow');

        toolsA.append(toolsAText, toolsArrow);
        tools.append(toolsA);

        const toolsDiv = document.createElement('div');
        toolsDiv.setAttribute('class', 'dropdown-content');

        // Dynamically add tools links
        data.tools.forEach((toolData) => {
            const toolLink = document.createElement('a');
            toolLink.setAttribute('href', `/psc/tools/${toolData.tool}/index.html`);
            const toolText = document.createTextNode(toolData.title);
            toolLink.appendChild(toolText);
            toolsDiv.appendChild(toolLink);
        });

        tools.append(toolsDiv); // Append dropdown content to Tools
        ul.append(tools); // Add Tools to navbar

        // Create ABOUT US link.
        const about = document.createElement('li');

        const aboutA = document.createElement('a');
        aboutA.setAttribute('href', '/psc/about/index.html');
        aboutA.setAttribute('class', 'dropbtn');

        const aboutAText = document.createTextNode('About Us ');


        aboutA.append(aboutAText);
        about.append(aboutA);

        ul.append(about); // Add About Us to navbar after Projects and Tools
    })
    .catch((error) => {
        console.error('Error fetching menu data:', error);
    });

// Append <link> & <ul> to <header>.
header.append(link);
header.appendChild(ul);
