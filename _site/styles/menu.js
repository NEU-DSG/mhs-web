// Get <header> by id "menu".
const header = document.getElementById('menu');

// Create <link> element for CSS.
const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', '/styles/menu.css');
header.appendChild(link);

// Create <ul> element.
const ul = document.createElement('ul');
ul.setAttribute('class', 'topnav');

// Create HOME link.
const l1 = document.createElement('li');
const homeA = document.createElement('a');
homeA.setAttribute('href', '/index.html');
homeA.setAttribute('class', 'logo');

const homeText = document.createTextNode('Home');
homeA.appendChild(homeText);
l1.appendChild(homeA);
ul.append(l1);


// Create first dropdown menu.
const project = document.createElement('li');
project.setAttribute('class', 'dropdown');

const projectA = document.createElement('a');
projectA.setAttribute('href', '/projects/index.html');
projectA.setAttribute('class', 'dropbtn');

const projectAText = document.createTextNode('Projects');
projectA.append(projectAText);
project.append(projectA);

const projectDiv = document.createElement('div');
projectDiv.setAttribute('class', 'dropdown-content');

// Create <li>'s in first dropdown menu.
// jqa
const jqaA = document.createElement('a');
jqaA.setAttribute('href', '/projects/JQA/index.html');
const jqaText = document.createTextNode('John Quincy Adams Diary Digital Project');
jqaA.append(jqaText);
projectDiv.append(jqaA);

// cmsol
const cmsolA = document.createElement('a');
cmsolA.setAttribute('href', '/projects/CMSOL/index.html');
const cmsolText = document.createTextNode('Catharine Maria Sedgwick Online Letters');
cmsolA.append(cmsolText);
projectDiv.append(cmsolA);

// taney
const rbtA = document.createElement('a');
rbtA.setAttribute('href', '/projects/rbt/index.html');
const rbtText = document.createTextNode('Roger Brooke Taney Papers');
rbtA.append(rbtText);
projectDiv.append(rbtA);

// Append <a> to project <div>
project.append(projectDiv); // Append <div> to project
ul.append(project);

// Create second dropdown menu.
const tools = document.createElement('li');
tools.setAttribute('class', 'dropdown');

const toolsA = document.createElement('a');
toolsA.setAttribute('href', '/tools/index.html');
toolsA.setAttribute('class', 'dropbtn');

const toolsAText = document.createTextNode('Tools');
toolsA.append(toolsAText);
tools.append(toolsA);

const toolsDiv = document.createElement('div');
toolsDiv.setAttribute('class', 'dropdown-content');

// Create <li>'s in first dropdown menu.
// network
const networkA = document.createElement('a');
networkA.setAttribute('href', '/tools/coref/index.html');
const networkText = document.createTextNode('Network Graphs');
networkA.append(networkText);
toolsDiv.append(networkA);

// geo
const geosA = document.createElement('a');
geosA.setAttribute('href', '/tools/geo/index.html');
const geosText = document.createTextNode('Geo-References');
geosA.append(geosText);
toolsDiv.append(geosA);

// timeline
const TimelinesA = document.createElement('a');
TimelinesA.setAttribute('href', '/tools/timeline/index.html');
const TimelinesText = document.createTextNode('Timelines');
TimelinesA.append(TimelinesText);
toolsDiv.append(TimelinesA);


// Append <a> to project <div>
tools.append(toolsDiv); // Append <div> to project
ul.append(tools);



// Create first dropdown menu.
const about = document.createElement('li');
about.setAttribute('class', 'dropdown');

const aboutA = document.createElement('a');
aboutA.setAttribute('href', '/about/index.html');
aboutA.setAttribute('class', 'dropbtn');

const aboutAText = document.createTextNode('About Us');
aboutA.append(aboutAText);
about.append(aboutA);

ul.append(about);


// Append <link> & <ul> to <header>.
header.append(link);
header.appendChild(ul);


