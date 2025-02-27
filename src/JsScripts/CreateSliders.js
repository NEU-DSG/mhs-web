
// Information about sliders and their listening events will be held here 
sliderConfigs = []
listenerConfigs = []


function SliderHTML(title, step, containerId) {
    /* 
        This function inserts the neccasary HTML into the index.html file for a slider to be created. 

        inputs: 
            title: the full name (all lowercase) of the slider.  
            step: the step the slider should be tied to 
            containerID: the container in which the slider should go, for this proj, it is always the 'Filter-Container

    */

    // Shorthand to keep track of slider values 
    const shortTitle = title.substring(0, 3);
    const labelId = `${shortTitle}-label`;

    const sliderHTML = `
        <div class="child">
            <h3 id="${labelId}" class="${shortTitle}-filter">
                ${title.charAt(0).toUpperCase() + title.slice(1)} Filter
            </h3>
            <div class="${shortTitle}-slider slider">
                <div class="${shortTitle}-min-value ${shortTitle}-numberVal" style="padding: .5rem;">
                    <label class="visually-hidden" for="${shortTitle}-minnum">Minimum ${title}</label>
                    <input type="number" min="0" max="100" value="25" id="${shortTitle}-minnum" disabled>
                </div>
               
                <div class="${shortTitle}-range-slider range-slider">
                    <div class="slider-track"></div>
                    <div class="${shortTitle}-progress progress"></div>

                    <label for="${shortTitle}-minrange" class="visually-hidden">Minimum ${title} Range</label>
                    <input type="range" class="${shortTitle}-range-min" min="0" max="100" value="25" step="${step}" id="${shortTitle}-minrange" aria-labelledby="${labelId}"">
                    <label for="${shortTitle}-maxrange" class="visually-hidden">Maximum ${title} Range</label>
                    <input type="range" class="${shortTitle}-range-max" min="0" max="100" value="75" step="${step}" id="${shortTitle}-maxrange" aria-labelledby="${labelId}">
                </div>
              
                <div class="${shortTitle}-max-value ${shortTitle}-numberVal" style="padding: .5rem;">
                    <label class="visually-hidden" for="${shortTitle}-maxnum">Maximum ${title}</label>
                    <input type="number" min="0" max="100" value="100" id="${shortTitle}-maxnum" disabled aria-labelledby="${labelId}">
                </div>
            </div>
        </div>
    `;

    // Append the slider HTML to the specified container
    document.getElementById(containerId).insertAdjacentHTML('beforeend', sliderHTML);
}

function initializeSlider(rangeSelector, progressSelector, inputValueSelector, gap) {
    /* 
        This function builds out the needed JS for each slider. It has to be fun after the html is inserted. 

        Inputs (these are all set programmatically): 
            - rangeSelector: The JS variable that represents the filter range 
            - progressSelector: The JS variable that represents the progress of the filter slider 
            - inputValueSelector: The JS variable that keeps track of the value that is input for the slider 
        User Inputs: 
            - Gap (int): this is how far the two sliders must be from each other (ie how small of a filter is allowed?)
    
    
    */

    // Gets the min and max slider 
    const range = document.querySelectorAll(rangeSelector);
    let min_slider = range[0];
    let max_slider = range[1];


    const progress = document.querySelector(progressSelector);
    const inputValue = document.querySelectorAll(inputValueSelector);

    // Every time a slider is changed 
    range.forEach(input => {
        input.addEventListener('input', e => {
            let minRange = parseFloat(min_slider.value);
            let maxRange = parseFloat(max_slider.value);

            // Checks if the gap condition is not upheld
            if (maxRange - minRange < gap) {

                // Checks if the target is the min slider, if it is sets it to the maximum possible value that uholds the gap position 
                if (e.target === min_slider) {

                    min_slider.value = maxRange - gap;
                } else {
                    // If it is the max slider that is changed, sets it to the min possible value that upholds the gap position 
                    max_slider.value = minRange + gap;
                }
            }

            // If the gap is uheld, sets the progress bar and number values to the corrext percentage/value
            else {
                progress.style.left = (minRange / min_slider.max) * 100 + '%';
                progress.style.right = 100 - (maxRange / max_slider.max) * 100 + '%';






                // Sets the number values 
                inputValue[0].value = minRange;
                inputValue[1].value = maxRange;
            }
        });
    });
}

function CreateSlider(title, step, containerId, gap) {
    /* 
        Using the above 2 functions, this creates a slider. 

        inputs (all in the previous functions) 
            - Title: full title string of slider 
            - Step : the step of the slider 
            - containerI: where to place slider in html 
            - gap: minimum filter range

    */

    // Shorthand to keep track of slider values 
    const shortTitle = title.substring(0, 3);

    // Inserts the needed HTML onto the page. 
    SliderHTML(title, step, containerId);

    // Once the HTML is set, connects it to the relevant Javascript functions 
    initializeSlider("." + shortTitle + "-range-slider input", "." + shortTitle + "-range-slider " + "." + shortTitle + "-progress", "." + shortTitle + "-numberVal input", gap);

    // The below adds entries into the config dics. THese keep track of every slider, and then once all are inserted, these configurations are used to make sure the sliders 
    // interact with each other correctly 
    const newSliderConfig = {
        id: shortTitle,
        min: shortTitle + '-minnum',
        max: shortTitle + '-maxnum',
        minRange: shortTitle + '-minrange',
        maxRange: shortTitle + '-maxrange',
        getValue: title
    };

    const newMinListenerConfig = {
        id: shortTitle + "-minrange",
        param: shortTitle + "Min",
        full_name: title
    };

    const newMaxListenerConfig = {
        id: shortTitle + "-maxrange",
        param: shortTitle + "Max",
        full_name: title
    };

    sliderConfigs.push(newSliderConfig);

    // Append the new entry to the sliderConfigs array
    listenerConfigs.push(newMinListenerConfig);
    listenerConfigs.push(newMaxListenerConfig);

}


function SetSliders(data) {
    /* 
        This function sets the default values for the slider as the max and min of the attribute, with some exceptions 

        input:
            data: right now this is not used due to the eval, but i am hoping to get way from using eval
    
    */

    // For every slider configured.. set the permissible ranges and defalt values based on the chart
    sliderConfigs.forEach(config => {

        // There has to be a better way. This checks if the min and max are ints (bet and eig are floats) and if they are floats, rounds the max up (to the thousands place) and sets the min to the floor  
        eval(" if(d3.extent(data.nodes.map(node => node." + config.getValue + "))[1] %1 !=0){minimum_" + config.id + " = Math.floor(d3.extent(data.nodes.map(node => node." + config.getValue + "))[0]); maximum_" + config.id + " = parseFloat((d3.extent(data.nodes.map(node => node." + config.getValue + "))[1]+.01).toString().substring(0, (d3.extent(data.nodes.map(node => node." + config.getValue + "))[1]+.01).toString().indexOf('.')+3));} else{maximum_" + config.id + "=d3.extent(data.nodes.map(node => node." + config.getValue + "))[1];minimum_" + config.id + "  = d3.extent(data.nodes.map(node => node." + config.getValue + "))[0];}");

        // Is this a pertinant security risk? 

        eval("document.getElementById('" + config.min + "').value = 0;");
        eval("document.getElementById('" + config.max + "').value =" + "maximum_" + config.id + ";");
        eval("document.getElementById('" + config.minRange + "').min = 0;");

        eval("document.getElementById('" + config.minRange + "').max =" + "maximum_" + config.id + ";");

        eval("document.getElementById('" + config.maxRange + "').min = 0;");
        eval("document.getElementById('" + config.maxRange + "').max  =" + "maximum_" + config.id + ";");

        eval("document.getElementById('" + config.minRange + "').value = 0;");
        eval("document.getElementById('" + config.maxRange + "').value =" + "maximum_" + config.id + ";");


        eval("FilterParams." + config.id + "Min = document.getElementById('" + config.id + "-minrange').value;");
        eval("FilterParams." + config.id + "Max = document.getElementById('" + config.id + "-maxrange').value;");

    });

}

function UpdateFilters(dataset, node, link, label) {
    /* 
    Function run whenever a slider value is changed. Updates the nodes visible to only be those that 
    meet all the criteria below. M
    
    Might it be worthwhile to add advanced logical filtering (ie AND/OR between different sliders)?
    */

    console.log(
        "Degree Min:" + FilterParams.degMin +
        '\n' + "Degree Max:" + FilterParams.degMax +
        '\n' +
        '\n' + "Modularity Min:" + FilterParams.modMin +
        '\n' + "Modularity Max:" + FilterParams.modMax +
        '\n' +
        '\n' + "Betweenness Min:" + FilterParams.betMin +
        '\n' + "Betweenness Max:" + FilterParams.betMax +
        '\n' +
        '\n' + "Eigenvector Min:" + FilterParams.eigMin +
        '\n' + "Eigenvector Max:" + FilterParams.eigMax
    );

    selections = (Array.from(document.getElementById('comms').selectedOptions).map(({ value }) => value)).map(Number);
    console.log(selections);

    // Right now, it does this filtering for every single attribute (min and max) every time any (possible unrelated) is udated. Is there a better way? 
    let FilteredNodes = dataset.nodes.map(d => Object.create(d))
        .filter(function (d) { return d.degree >= FilterParams.degMin })
        .filter(function (d) { return d.degree <= FilterParams.degMax })
        .filter(function (d) { return selections.includes(parseInt(d.modularity)) })
        .filter(function (d) { return d.betweenness >= FilterParams.betMin })
        .filter(function (d) { return d.betweenness <= FilterParams.betMax })
        .filter(function (d) { return d.eigenvector >= FilterParams.eigMin })
        .filter(function (d) { return d.eigenvector <= FilterParams.eigMax });

    // Gets only the Ids of the filtered Nodes 
    NewNodes = FilteredNodes.map(function (FilteredNodes) { return FilteredNodes.id; });


    // If the node is in the list, it is visible, if it is not, it isn't 
    node.style('visibility', function (o) {
        return NewNodes.includes(o.__proto__.id) ? "visible" : "hidden";
    });

    // If both the target and source node are unfiltered, the links will be visible
    link.style('visibility', function (o) {
        return NewNodes.includes(o.__proto__.source.id) && NewNodes.includes(o.__proto__.target.id) ? "visible" : "hidden";
    });

    // If a node is visible, its label will be as well
    label.text(d => d.name).attr('visibility', function (o) {
        // If a node is neighbor with source, show text -- if not, don't.

        if (NewNodes.includes(o.__proto__.id) && o.__proto__.degree > 3) {
            return "visible";
        }

        else {
            return "hidden";
        }
    });
}


function setupSliderListeners(data, node, link, label) {
    /*
        Every slider has 2 inputs (a minimum and maximum value). 

        This builds listners for each input for each slider that then tell the chart to update. 
            
        inputs: 
            data, node, link, label (all pertinent chart objects)

    */

    // For each (BOTH min and max) slider input 
    listenerConfigs.forEach(Listener => {
        //Listen for changes..
        d3.select("#" + Listener.id).on("change", function () {
            // Update the corresponding FilterParams value
            eval("FilterParams." + Listener.param + " = document.getElementById('" + Listener.id + "').value;");
            // Run the UpdateFilters function with updated values
            UpdateFilters(data, node, link, label);
        });
    });
}


