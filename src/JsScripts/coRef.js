
// Utilities.

function createArray(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

function formatNumbers(d) {
    /*
    Function that rounds number to 2 significant digits, with no grouping for thousnads. 

    Inputs: 
        d: number to be rounded
    */
    return d3.format('.2r')(d);
}


function neigh(a, b) {
    /* 
    Function that checks if two nodes are neighbors, or the same node

    Inputs: 
        a: Node 1
        b: Mode 2

    */

    // Checks if a = b, OR if the adjlist includes the connection a-b OR b-a
    return a == b || adjlist.includes(a + '-' + b) || adjlist.includes(b + '-' + a);
}


window.Extent = [];

function graph(filepath) {

    return new Promise((resolve) => {

        if (window.simulation) {
            window.simulation.stop(); // Stop the existing simulation if it is running
        }


        FilterParams = {} // Filter params dict
        adjlist = [] // Adjacency list for highlighting connected nodes.

        // "data" now holds the JSON data for building the grapgh
        d3.json(filepath).then(data => {

            mod_range = d3.extent(data.nodes.map(node => node.modularity))
            window.Extent = createArray(mod_range[0], mod_range[1]);

            d3.selectAll("svg > *").remove();

            data.nodes.forEach(function (d) {
                d.name = `${d.given_name} ${d.middle_name ? d.middle_name + ' ' : ''}${d.family_name}`;
            });

            // Build constants. (window size and length of transitions)
            let margin = { top: 40, right: 30, bottom: 40, left: 30 },
                width = 850, height = 500, duration = 300;

            const zoom = d3.zoom()
                .scaleExtent([0.15, 6])
                .on("zoom", function (event) {
                    svg.attr("transform", event.transform);
                });


            // Build container.
            const svg = d3.select('.network')
                .append('svg')
                .attr("height", height + margin.top + margin.bottom) // Contained.
                .attr("width", "100%")
                .attr("margins", "0px auto")
                .attr("display", "block")
                .call(zoom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // Set initial zoom level and translation.
            const initialScale = 0.25;  // Set this to a value less than 1 to zoom out
            const initialTranslateX = width / 4;  // Center horizontally
            const initialTranslateY = height / 4; // Center vertically

            d3.select('svg')
                .call(zoom.transform, d3.zoomIdentity
                    .translate(initialTranslateX, initialTranslateY)
                    .scale(initialScale));

            // Coordinates of SVG boundaries.
            const pos = svg.node().getBoundingClientRect();
            console.log(pos);

            // Build elements.
            svg.append('g').attr('class', 'links'); // links
            svg.append('g').attr('class', 'nodes'); // nodes
            svg.append('g').attr('class', 'labels'); // labels

            // Build tooltip.
            const tooltip = d3.select('.network') // d3.select('.tooltip-container')
                .append('div')
                .attr('class', 'network-tooltip')
                .style('opacity', 0)
                .style('position', 'fixed')
                .attr('pointer-events', 'none');

            const toolHeader = tooltip
                .append('h3')
                .attr('class', 'toolHeader')
                .attr('pointer-events', 'none');

            const toolBody = tooltip
                .append('p')
                .attr('class', 'toolBody')
                .attr('pointer-events', 'none');

            // Build first-step for focus/unfocus: adjlist + neigh()
            data.links.forEach(function (d) {
                adjlist.push(d.source + '-' + d.target);
            });

            // Define 15 distinct colors
            let colorArray = (d3.schemeSet3.slice(0, 15))

            // removes a super ugly color 
            colorArray.splice(1, 1);

            // Assign colors based on modularity (assuming modularity values are integers from 1 to 15)
            let nodeColor = d3.scaleOrdinal()
                .domain(d3.range(0, 15))
                .range(colorArray);

            let nodeScale = d3.scaleLinear()
                .domain(d3.extent(data.nodes.map(node => node.degree)))
                .range([25, 100]);

            let fontSizeScale = d3.scaleLinear()
                .domain([0, d3.max(data.nodes.map(node => node.degree))])
                .range([16, 32]);

            let edgeScale = d3.scaleLinear()
                .domain(d3.extent(data.links.map(link => link.weight)))
                .range([3, 20])

            // Initiate variables for later use.
            let link, node, label;

            // Build force simulation. Mostly boilerplate from docs
            // Documentation: https://devdocs.io/d3~7/d3-force#forcesimulation
            window.simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody()
                    .strength(-1000)
                    .distanceMin(100)
                    .distanceMax(1000)
                )
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force("gravity", d3.forceManyBody()
                    .strength()
                )
                .force("collision", d3.forceCollide()
                    .radius(d => d.r * 2)
                )
                .force('center', d3.forceCenter(width / 2, height / 2));


            // Add nodes, links, & labels to simulation and tell them to move in unison with each tick.
            window.simulation
                .nodes(data.nodes, d => d.id)
                .force('collide', d3.forceCollide().radius(d => nodeScale(d.degree) + 10))
                .force("link", d3.forceLink(data.links)
                    .id(d => d.id)
                    .distance(height / data.nodes.length)
                    // .distance(100)
                )

                .on("tick", (d) => { // tick function.

                    label
                        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

                    link
                        .attr("x1", d => d.source.x)
                        .attr("y1", d => d.source.y)
                        .attr("x2", d => d.target.x)
                        .attr("y2", d => d.target.y);

                    node
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y);

                    // Check if the nodes have essentially stopped moving
                    const minVelocityThreshold = 0.01; // Define a very small velocity threshold
                    let isStable = true;  // Flag to track if all nodes are stable

                    window.simulation.nodes().forEach((d) => {
                        if (Math.abs(d.vx) > minVelocityThreshold || Math.abs(d.vy) > minVelocityThreshold) {
                            isStable = false; // If any node is still moving, the graph is not stable
                        }
                    });

                    if (isStable) {
                        window.simulation.stop(); // Stop the simulation when all nodes have minimal velocity
                    }
                }

                );

            // Sets all the modular slider filter values -- functions set out in CreateSliders.js
            SetSliders(data);

            // Creates an array, each entry being info on a single node/link
            let nodes = data.nodes.map(d => Object.create(d));



            // This value will change when filtered, but it is set to default at all nodes 
            NewNodes = nodes.map(function (nodes) { return nodes.id; });

            // ALl links are drawn for now, then the opacity of irrelevant ones is changed later
            let links = data.links.map(d => Object.create(d));

            // Draw links.
            link = d3.select('.links') // Selects all links 
                .selectAll('line')
                .data(links)
                .join( // Handles enter, update, exit selection 
                    enter => enter.append('line')
                        .attr('class', 'edge')

                        // Sets the starting and ending coordinates for links
                        .attr("x1", d => d.source.x)
                        .attr("y1", d => d.source.y)
                        .attr("x2", d => d.target.x)
                        .attr("y2", d => d.target.y)


                        // Sets the color and width of each line 
                        .attr('stroke', d => nodeColor(d.source['modularity']))
                        .attr('stroke-width', d => edgeScale(d.__proto__.weight))
                        .attr('opacity', 0.6)
                    ,


                    update => update, // Unchanged
                    exit => exit.transition().remove() // When links no longer have corrosponding data points, they fade out
                );



            // Draw nodes.
            node = d3.select('.nodes')
                .selectAll("circle")
                .data(nodes)
                .join(
                    enter => enter.append('circle')
                        .attr('class', 'node')
                        .attr('id', d => d.name.toLowerCase())

                        // Sets coordinates of center of node
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y)

                        // Sets size and color 
                        .attr('r', (d) => nodeScale(d.degree))
                        .attr('fill', (d) => nodeColor(d.modularity)),

                    update => update, // Unchanged 
                    exit => exit.transition().remove() // Will fade out on exit 
                )


            // Write labels.
            label = d3.select('.labels')
                .selectAll('text')
                .data(nodes)
                .join(
                    enter => enter.append('text')
                        .attr('class', 'label')
                        .attr('pointer-events', 'none')
                        // Label is shown if degree over 3.0, and it is scaled based off degree    
                        .text(d => { if (d.degree > 3.0) { return d.name } else { return '' } })
                        .attr('font-size', d => fontSizeScale(d.degree)),

                    update => update // If text is updated, handled the same way 
                        .text(d => { if (d.degree > 3.0) { return d.name } else { return '' } })
                        .attr('font-size', d => fontSizeScale(d.degree)),

                    exit => exit.transition().remove() // transition out 
                )

            // Reheat simulation. (Gravity) 
            //};

            // Function to handle mouseover
            function handleMouseOver(event, d, node, link, label, tooltip, toolHeader, toolBody, duration, NewNodes, neigh, formatNumbers) {
                let source = d3.select(event.target).datum().__proto__.id;
                let checkbox = document.getElementById('filterCheckbox');

                if (checkbox.checked) {
                    node.style('visibility', 'visible');
                    link.style('visibility', 'visible');

                    node.style('opacity', function (o) {
                        let IsInFilters = NewNodes.includes(o.__proto__.id);
                        let IsNeigh = neigh(source, o.__proto__.id);

                        if (IsInFilters && IsNeigh) return 1;
                        else if (!IsInFilters && IsNeigh) return 0.45;
                        else if (IsInFilters && !IsNeigh) return 0.1;
                        else return 0;
                    });

                    link.style('opacity', function (o) {
                        let IsInFilters = (NewNodes.includes(o.__proto__.source.id)) && (NewNodes.includes(o.__proto__.target.id));
                        let IsConnected = o.__proto__.source.id == source || o.__proto__.target.id == source;

                        if (IsInFilters && IsConnected) return 1;
                        else if (!IsInFilters && IsConnected) return 0.45;
                        else if (IsInFilters && !IsConnected) return 0.1;
                        else return 0;
                    });

                    label
                        .text(d => d.name)
                        .attr('visibility', function (o) {
                            return neigh(source, o.__proto__.id) ? "visible" : "hidden";
                        });
                } else {
                    node.style('opacity', function (o) {
                        return neigh(source, o.__proto__.id) ? 1 : 0.1;
                    });

                    link.style('opacity', function (o) {
                        return o.__proto__.source.id == source || o.__proto__.target.id == source ? 1 : 0.1;
                    });

                    label
                        .text(d => d.name)
                        .attr('visibility', function (o) {
                            return neigh(source, o.__proto__.id) && NewNodes.includes(o.__proto__.id) ? "visible" : "hidden";
                        });
                }

                let nodeInfo = [
                    ['Degree', formatNumbers(d.degree, 2)],
                    ['Modularity', formatNumbers(d.modularity, 2)],
                    ['Betweenness', formatNumbers(d.betweenness, 3)],
                    ['Eigenvector', formatNumbers(d.eigenvector, 3)],
                ];

                tooltip
                    .transition(duration)
                    .attr('pointer-events', 'none')
                    .style('opacity', 0.7)
                    .style('color', "#fff")
                    .style("right", "0px")
                    .style("top", "600px");

                toolHeader
                    .html(d.name)
                    .attr('pointer-events', 'none')
                    .style('color', "#fff");

                toolBody
                    .selectAll('p')
                    .data(nodeInfo)
                    .style('color', "#fff")
                    .join('p')
                    .html(d => `${d[0]}: ${d[1]}`)
                    .attr('pointer-events', 'none');
            }

            // Function to handle mousemove
            function handleMouseMove(tooltip) {
                tooltip.style("right", "0px").style("top", "600px");
            }

            // Function to handle mouseout
            function handleMouseOut(node, link, label, tooltip, duration, UpdateFilters, data, NewNodes) {
                tooltip.transition(duration).style('opacity', 0);

                let checkbox = document.getElementById('filterCheckbox');
                if (checkbox.checked) {
                    UpdateFilters(data, node, link, label);
                }

                label
                    .text(d => d.name)
                    .attr('visibility', function (o) {
                        return NewNodes.includes(o.__proto__.id) ? "visible" : "hidden";
                    });

                label
                    .text(d => d.degree > 3.0 ? d.name : '')
                    .attr('display', 'block');

                node.style('opacity', 1);
                link.style('opacity', 1);
            }

            // Function to handle click
            function handleClick(event, d) {
                let url = "https://www.primarysourcecoop.org/publications/coop/explore/person/" + d.id;
                window.open(url, "_blank");
            }

            let tappedNode = null; // Track the currently tapped node

            // Attach events to nodes
            node.on('mouseover', function (event, d) {
                handleMouseOver(event, d, node, link, label, tooltip, toolHeader, toolBody, duration, NewNodes, neigh, formatNumbers);
            });

            node.on('mousemove', function () {
                handleMouseMove(tooltip);
            });

            node.on('mouseout', function () {
                handleMouseOut(node, link, label, tooltip, duration, UpdateFilters, data, NewNodes);
            });

            node.on('click', function (event, d) {
                handleClick(event, d);
            });

            // For mobile devices
            node.on('touchstart', function (event, d) {
                event.preventDefault(); // Prevent default touch behavior

                if (tappedNode === d) {
                    // If the same node is tapped again, treat it as a "click"
                    handleClick(event, d);
                    tappedNode = null; // Reset the tappedNode
                } else {
                    // If a different node is tapped, treat it as a "mouseover"
                    tappedNode = d;
                    handleMouseOver(event, d, node, link, label, tooltip, toolHeader, toolBody, duration, NewNodes, neigh, formatNumbers);
                }
            });

            // Reset tappedNode when touch ends outside the node
            node.on('touchend', function () {
                tappedNode = null;
            });

            // Slider Listening Events -- These are built modularly and is handled in the CreateSliders.js function. Basically, it listens out for all the sliders and updates the filter params when they change
            setupSliderListeners(data, node, link, label);

            d3.select(comms).on("change", function () {
                // Update the corresponding FilterParams value
                UpdateFilters(data, node, link, label);
            });


            resolve();

        });
    });

}

function Searched() {

    // Reset all circle strokes to none
    d3.selectAll('circle')
        .style('stroke', 'none');

    // Get the search value and split it into individual words (lowercase)
    const searchValue = document.getElementById('site-search').value.toLowerCase().trim();

    // If the searchValue is empty, don't highlight anything
    if (searchValue === "") {
        return;  // Stop the function if there is no input
    }

    const searchTerms = searchValue.split(" ").filter(term => term.trim() !== ""); // Split by space and remove empty terms

    // Check if each id contains all search terms
    d3.selectAll('circle').each(function (d) {
        const elementId = d3.select(this).attr('id'); // Get the ID of the current element
        if (elementId) {
            // Check if all search terms are found in the element's ID
            const allTermsFound = searchTerms.every(term => elementId.includes(term));

            if (allTermsFound) {
                d3.select(this)
                    .style('stroke', 'black')
                    .style('stroke-width', '2%');
            }
        }
    });

    console.log(searchValue);

    // Add input event listener to handle clearing the input
    document.getElementById('site-search').addEventListener('input', (e) => {
        if (document.getElementById('site-search').value.trim() === "") {
            d3.selectAll('circle')
                .style('stroke', 'none');  // Remove all strokes if the input is empty
        }


    });
}