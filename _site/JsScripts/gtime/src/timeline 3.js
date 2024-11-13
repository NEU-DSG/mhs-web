import * as d3 from 'd3';
import { timelineAxisLeft, timelineAxisRight } from "./timelineaxis";
import tooltip from "./tooltip";
import { durationFormat, f, pipe } from "./utils";
import { selectAll } from 'd3-selection';


var collapsed_rows = 0
var expanded_rows = 0

const google_colors = [
  "#4285f4",
  "#db4437",
  "#f4b400",
  "#0f9d58",
  "#ab47bc",
  "#5e97f5",
  "#e06055",
  "#f5bf26",
  "#33ab71",
  "#b762c6",
  "#00acc1",
  "#ff855f",
  "#9e9d24",
  "#26b8ca",
  "#ff7043",
];

function getFontSize(element) {
  const style = window.getComputedStyle(element, null).getPropertyValue("font-size");
  return parseFloat(style);
}

function luma_BT709(c) {
  return c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
}

function isBright(color) {
  return luma_BT709(color) > 165; // original is 186, but I prefer that value
}

function textColor(value) {
  return isBright(d3.color(value)) ? "black" : "white";
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

function translate(x, y) {
  return "translate(" + x + "," + y + ")";
}

function hideTasksWithDashClass() {
  //misha
  // This function hides the bars that hold the info regarding the header data. They are hidden by default, which is done via this function

  const elementsToHide = document.querySelectorAll('g.task[class*=" --"]');

  elementsToHide.forEach(function (element) {
    element.style.display = 'none';
  });
}


function shiftcolumns(headerRowElement, yGroupSelection, adjvalue) {
/*
  Misha
  Shifts the positions of rows and associated elements vertically by a given adjustment value.
  
  This function adjusts the vertical positioning of the rows, task rects, text elements, 
  the vertical path, and the bottom axis based on the specified adjustment value (`adjvalue`). 
 */
 

  // The classes of the clicked element
  const headerRow = d3.select(headerRowElement,);
  const headerClass = headerRow.attr("class")

  // Initialize an array to store the class names of rows after the header
  const rows = [];
  let foundFirstHeader = false;

  // Iterate through all g.row elements after the clicked header
  yGroupSelection.selectAll("g.row").each(function (rowData) {

    const currentRow = d3.select(this);
    // This is all the classes 
    const currentRowClass = currentRow.attr("class");

    // If we encounter the next header, stop collecting rows
    if (currentRowClass == headerClass) {
      foundFirstHeader = true;

    }

    // If we have found the first header, start 
    else if (foundFirstHeader) {

      // Shifts the rows by the given y adjustment value ( 38* number of rows)
      let transform = this.getAttribute('transform');
      let currentX = parseFloat(transform.split("(")[1].split(",")[0].trim());
      let currentY = parseFloat(transform.split(",")[1].split(")")[0].trim());
      this.setAttribute('transform', `translate(${currentX},${currentY + adjvalue})`);

      // The one class name
      var className = currentRowClass.split(" ")[1]

      // Adjust the y attribute for all <rect> elements inside g.task elements with the specific class name
      const rectElements = document.querySelectorAll(`g.task.${className} rect`);
      rectElements.forEach(function (rectElement) {

        // Set the new y value
        rectElement.setAttribute('y', parseFloat(rectElement.getAttribute('y')) + adjvalue);
      });

      // Adjust the y attribute for all <text> elements inside g.task elements with the specific class name
      const textElements = document.querySelectorAll(`g.task.${className} text`);
      textElements.forEach(function (textElement) {
        // Set the new y value
        textElement.setAttribute('y', parseFloat(textElement.getAttribute('y')) + adjvalue);
      });

    }

  });

  // Changes the x ticks 
  d3.selectAll(".tick line")
  .each(function () {
    const tick = d3.select(this);
    const currentY1 = parseFloat(tick.attr("y1")) 


    if (!isNaN(currentY1)){
      tick.attr("y1", currentY1+ adjvalue);
    }
    
  });

  // Select the <path> element with stroke-width="1.75"
  const pathElement = document.querySelector('path[stroke-width="1.75"]');
  let pathD = pathElement.getAttribute('d');

  // Extract the vertical endpoint from the path (e.g., "V6270") using a regex
  let pathValues = pathD.match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/);

  let startX = parseFloat(pathValues[1]);
  let startY = parseFloat(pathValues[2]);
  let endY = parseFloat(pathValues[3]);

  // Adjust the vertical endpoint by reducing it
  let newEndY = endY + adjvalue;

  // Update the 'd' attribute with the new vertical endpoint
  pathElement.setAttribute('d', `M${startX},${startY}V${newEndY}`);

  // Select the bottom axis using d3
  const xAxisElement = d3.select('g.x.axis.bottom-axis');

  // Get the current transform attribute
  let transform = xAxisElement.attr('transform');

  // Extract the current X and Y values from the transform attribute
  let currentX = parseFloat(transform.split("(")[1].split(",")[0].trim());
  let currentY = parseFloat(transform.split(",")[1].split(")")[0].trim());

  // Calculate the new Y value after the adjustment
  let newY = currentY + adjvalue;

  // Set the new transform attribute using d3 to apply the new Y value
  xAxisElement.attr('transform', `translate(${currentX}, ${newY})`);
}

function transitionUp(headerRowElement, rows) {
  /*
  Misha
  Transitions the rows and tasks upward with an animation.
  
  This function reveals the rows associated with the provided header, hides the aggregate header tasks,
  and animates the tasks upward based on their respective row positions. After the animation,
  the tasks are hidden again, and their positions are reset.
*/

  rows.forEach(function (rowClass) {
    // Select all row elements with the specific class
    const rowElements = document.querySelectorAll(`g.row.${rowClass}`);

    // show all the rows  
    rowElements.forEach(function (rowElement) {
      rowElement.style.display = "block";
    });

  });

  const headerClass = d3.select(headerRowElement,).attr("class").split(" ")[1];

  // Selects all data points of the header class 
  d3.selectAll(`g.task.${headerClass}`).each(function (d) {

    // If the data is for the aggregate, hide it 
    var task = d[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    if (task == headerClass.replace(/--/g, "")) {
      d3.select(this).style("display", "none");

    }

    // Else, do the animation 
    else if (task != headerClass.replace(/--/g, "")) {
      d3.select(this).style("display", "block");  // Ensure the element is visible

      var adjustment = (rows.indexOf(task) + 1) * 38;
      let gElement = d3.select(this);

      // The amount to animate by 
      let transform = gElement.attr('transform');
      let currentX = parseFloat(transform.split("(")[1].split(",")[0].trim());
      let currentY = parseFloat(transform.split(",")[1].split(")")[0].trim());
      let newY = currentY + adjustment;

      gElement
        .attr('transform', `translate(${currentX}, ${currentY})`)  // Ensure it starts from the current position
        .transition()
        .duration(1000)  // Set animation duration
        .attr('transform', `translate(${currentX}, ${newY})`)  // Animate the transform to the new position
        .on("start", () => {
          // Hides the data under the header until the animation is complete 
          selectAll(`g.task.${task}`).style("display", "none");

        })
        .on("end", () => {

          // Hide the animated elements
          gElement.style("display", "none");

          // Move the animated elements back to their original position
          gElement.attr('transform', `translate(${currentX}, ${currentY})`);  // Reset to original

          // re-Show the data points that were hidden  
          selectAll(`g.task.${task}`).style("display", "block");
        });
    }
  });
}

function transitionDown(headerRowElement, rows) {
  /*
  Misha
  Transitions the rows and tasks downward with an animation.
  
  This function animates the tasks downward, hides the elements post-animation,
  and resets their positions back to the original state. The function returns a 
  promise that allows asynchronous operations to wait for the animation to complete.
*/

  // Make it so that the following items onlt happen after this is done 
  return new Promise((resolve) => {

    const headerClass = d3.select(headerRowElement,).attr("class").split(" ")[1];

    // Select everything data point that is not in the header row 
    d3.selectAll(`g.task:not(.${headerClass})`).each(function (d) {
      var task = d[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");

      // If a row is under a certain header animate it 
      if (rows.includes(task)) {
        d3.select(this).style("display", "block");  // Ensure the element is visible

        var adjustment = (rows.indexOf(task) + 1) * 38;

        let gElement = d3.select(this);

        // Gets the adjustment value 
        let transform = gElement.attr('transform');
        let currentX = parseFloat(transform.split("(")[1].split(",")[0].trim());
        let currentY = parseFloat(transform.split(",")[1].split(")")[0].trim());
        let newY = currentY - adjustment;

        gElement
          .transition()
          .duration(1000)  // Set animation duration
          .attr('transform', `translate(${currentX}, ${newY})`)
          .on("end", () => {

            //Make the header class g elements visible
            d3.selectAll(`g.${headerClass}`).style("display", "block");

            //Hide the animated elements
            gElement.style("display", "none");

            //Move the animated elements back to their original position
            gElement.attr('transform', `translate(${currentX}, ${currentY})`);  // Reset to original

            // Hide the rows under the header 
            rows.forEach(function (rowClass) {
              // Select all elements with the class and hide them
              const elements = document.querySelectorAll(`.${rowClass}`);

              elements.forEach(function (element) {
                element.style.display = "none";  // Set display to none to hide the elements
              });
            });

            // Now next things are allowed to execute 
            resolve();
          });
      }
    });
  });
}

function getaffectedcolumns(headerRowElement, yGroupSelection) {
  /*
  Misha
  Retrieves the column names that are affected by the expansion or collapse of a given header row.
  
  This function iterates through all the row elements following a header and collects 
  the class names of the rows until the next header is encountered.
*/

  // Find the parent <g> element of the clicked 
  const headerRow = d3.select(headerRowElement,);

  // Get the class name of the clicked header row (e.g., --African-American--)
  const headerClass = headerRow.attr("class");

  // Initialize an array to store the class names of rows after the header
  const rows = [];
  let foundFirstHeader = false;
  let foundNextHeader = false;


  // Iterate through all g.row elements 
  yGroupSelection.selectAll("g.row").each(function (rowData) {

    const currentRow = d3.select(this);
    // This is all the classes 
    const currentRowClass = currentRow.attr("class");

    // If we encounter the first header, start collecting rows
    if (currentRowClass == headerClass) {
      foundFirstHeader = true;
    }

    // If we found the first header, and we run into another header, stop counting 
    else if (foundFirstHeader && currentRowClass.split(" ")[2] == "timelineheader") {
      foundNextHeader = true
    }

    // Keeps track of all the rows found between the 2 condtitions above 
    else if (foundFirstHeader && !foundNextHeader) {
      rows.push(currentRowClass.split(" ")[1]);

    }

  });
  return rows;
}

function collapseAll() {
  const collapseButton = document.getElementById('collapseAllButton');
  
  collapseButton.disabled = true; // Temporarily disable the button

  let collapsePromises = [];

  // Loop through each header and collapse only the expanded ones
  d3.selectAll("g.row.timelineheader text").each(function() {
    const text = d3.select(this).text();

    if (text === "-") {
      const headerElement = this.parentNode;
      const rows = getaffectedcolumns(headerElement, d3.select(headerElement.parentNode));
      const adjustment = rows.length * 38;

      let collapsePromise = transitionDown(headerElement, rows, "none").then(() => {
        shiftcolumns(headerElement,d3.select(headerElement.parentNode), -adjustment);
        d3.select(this).text("+").style("font-size", "20px"); // Change to plus sign and adjust font
      });

      collapsePromises.push(collapsePromise);
    }
  });

  // Re-enable the button after all transitions complete
  Promise.all(collapsePromises).then(() => {
    collapseButton.disabled = false;
  });
}
window.collapseAll = collapseAll;

function expandAll() {
  const expandButton = document.getElementById('expandAllButton');
  expandButton.disabled = true; // Disable while expanding

  let expandPromises = [];

  // Iterate through each header and expand those that are collapsed
  d3.selectAll("g.row.timelineheader text").each(function() {
    const text = d3.select(this).text();

    if (text === "+") {
      const headerElement = this.parentNode;
      const rows = getaffectedcolumns(headerElement, d3.select(headerElement.parentNode));
      const adjustment = rows.length * 38;

      // Trigger expansion and then adjust columns
      let expandPromise = new Promise((resolve) => {
        transitionUp(headerElement, rows); // Expand rows first
        shiftcolumns(headerElement, d3.select(headerElement.parentNode), adjustment); // Adjust columns
        resolve(); // Notify promise is done
      }).then(() => {
        // Change the text to "-" once expanded
        d3.select(this).text("-").style("font-size", "30px");
      });

      expandPromises.push(expandPromise);
    }
  });

  // Re-enable the button after all expansions are done
  Promise.all(expandPromises).then(() => {
    expandButton.disabled = false;
  });
}
window.expandAll = expandAll;




export default function (collection) {
  let colors = google_colors,
    padding = 5,
    milestone_width = 2,
    reversed = false,
    today = false,
    dates,
    const_width,
    duration = 0,
    labels = f(0),
    names = f(1),
    starts = f(2),
    ends = f(3);

  console.log(collection);

  function trim_text_to_rect(task, d) {
    const text = task.select("text"),
      rect = task.select("rect"),
      rect_width = rect.attr("width") - 2 * padding,
      string = names(d);

    text.text(string);
    let text_width = text.node().getComputedTextLength();

    if (text_width > rect_width) {
      const ratio = rect_width < 0 ? 0 : rect_width / text_width,
        length = Math.floor(string.length * ratio);

      text.text(length > 2 ? string.slice(0, length - 2) + "…" : "");
    }
  }

  function add_text_background(task, d, yAxis) {
    const text_node = task.select("text").node(),
      bbox = text_node.getBBox(),
      index = yAxis.scale().domain().indexOf(labels(d)),
      color = yAxis.colorscale()(index);

    const bckg = task.selectAll("rect.bckg").data([d]).join('rect').attr('class', 'bckg')
      .attr('fill', color).attr('x', bbox.x - padding + milestone_width).attr('y', bbox.y - 2).attr('width', bbox.width + padding - milestone_width).attr('height', bbox.height);
    task.node().insertBefore(bckg.node(), text_node)
  }

  function trim_text(selection, yAxis) {
    selection.each(function (d, i) {
      const task = d3.select(this.parentNode);
      ends(d) - starts(d) ? trim_text_to_rect(task, d) : add_text_background(task, d, yAxis);
    });
  }

  function tween_text(yAxis) {
    return function (d, i) {
      // this is overkill if duration is 0
      d3.active(this).tween("text", function () {
        return function (t) {
          trim_text(d3.select(this), yAxis);
        };
      });
    }
  }


  function chart(selection) {
    const data = selection.datum(),
      rows = new Set(d3.map(data, labels)),
      tip = new tooltip(tooltip_html),
      cScale = d3.scaleOrdinal(colors);
    dates = dates || [d3.min(data, starts), d3.max(data, ends)];

    if (today) dates = d3.extent(dates.concat(new Date()));

    selection.each(function (data) {
      const width = const_width || this.getBoundingClientRect().width - 15,
        height = rows.size * (getFontSize(this) + 4 * padding),
        yScale = d3.scaleBand().domain(rows).range([0, height]), //.padding(0.1),
        xScale = d3.scaleTime().domain(dates),
        yAxis = (reversed ? timelineAxisRight : timelineAxisLeft)(yScale).width(width),
        svg = d3.select(this).selectAll("svg").data([1]).join("svg");

      svg
        .attr("class", "timeline")
        .attr("width", width)
        .attr("height", height + 40); // margin.bottom

      const g = svg.append("g").attr("transform", "translate(" + 0 + "," + 20 + ")");;
      const yGroup = g.append("g").attr("class", "y axis").call(yAxis);

        // Select the <path> element with stroke-width="1.75"
  const pathElement = document.querySelector('path[stroke-width="1.75"]');
  let pathD = pathElement.getAttribute('d');

  // Extract the vertical endpoint from the path (e.g., "V6270") using a regex
  let pathValues = pathD.match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/);

  let PathxValue = parseFloat(pathValues[1]);

      yGroup.selectAll("text")
        .on("mouseover", function () {
          d3.select(this).style("text-decoration", "underline");  // Underline on hover
        })
        .on("mouseout", function () {
          d3.select(this).style("text-decoration", "none");  // Remove underline when not hovering
        })
        .attr("text-anchor", function (d) {
          // Center justify the text is a header, otherwise right justify
          return d.startsWith(" •") ? "middle" : "end";
        })
        .attr("x", function (d) {
          // If the text starts with "--", set x to 167, otherwise set x to 332.5
          return d.startsWith(" •") ? PathxValue / 2 : PathxValue - 0.5;
        })
        .style("cursor", "pointer")  // Show pointer to indicate it's clickable
        .style("font-weight", function (d) {
          // Make the text bold if it is a header 
          return d.startsWith(" •") ? "bold" : "normal";
        })
        .style("background", "none")
        .on("click", function (event, d) {
          // Cleans text for link 
          const cleanedText = d.replace(/ • /g, "").replace("Topic, ", "");
          const searchSubject = cleanedText.replace(" ", "%20");  // Replace spaces with %20 for the URL

          const url = `https://www.primarysourcecoop.org/publications/${collection}/search#q%3D%2Bsubject%3A%22${searchSubject}%22`;
          window.open(url, "_blank");
        });

        

      yGroup.selectAll("g.row")
        .each(function (d) {

          const textContent = d3.select(this).datum();

          d3.select(this).classed((d3.select(this).datum()).replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""), true);

          //console.log((d3.select(this).select("text").text()).replace(/•/g,"").replace(/ /g,"-").replace(/[^a-zA-Z0-9-]/g, ""));
          // Check if the text starts with " •"
          if (textContent.startsWith(" •")) {
            // Add the icon only for rows where the text starts with " •"
            d3.select(this)  // Select the current <g> group
              .classed("timelineheader", true)
              .append("text")  // Append a new <text> element for the icon
              .attr("x", PathxValue-10)  // Set the position of the icon
              .attr("y", 25)  // Align the icon vertically with the text
              .text("-")  // Set the icon content
              .style("text-anchor", "end")
              .style("cursor", "pointer")  // Make the icon clickable
              .style("font-size", "30px")  // Set icon size
              .attr("fill", "black")
              .style("-ms-user-select", "none")
              .style("-webkit-user-select", "none")
              .style("user-select", "none")
          }
        });


      yGroup.selectAll("g.row.timelineheader text")
        .on("click", function (event, d) {
          const text = d3.select(this).text();

          if (text === "+") {

            collapsed_rows -= 1
            expanded_rows += 1

            console.log("Collapsed: ",collapsed_rows);
            console.log("Expanded: ",expanded_rows);

            let rows = getaffectedcolumns(this.parentNode, yGroup);
            let adjustment = rows.length * 38

            transitionUp(this.parentNode, rows);

            shiftcolumns(this.parentNode, yGroup, adjustment);

            // Toggle the + to - and vice versa
            const currentText = d3.select(this).text();
            if (currentText === "+") {
              d3.select(this).text("-").style("font-size", "30px");
            } else {
              d3.select(this).text("+");
            }
          } else if (text === "-") {

            collapsed_rows += 1
            expanded_rows -= 1

            console.log("Collapsed: ",collapsed_rows);
            console.log("Expanded: ",expanded_rows);

            let rows = getaffectedcolumns(this.parentNode, yGroup);
            let adjustment = rows.length * 38

            transitionDown(this.parentNode, rows, "none").then(() => {

              shiftcolumns(this.parentNode, yGroup, -adjustment);
            });

            // Toggle the + to - and vice versa
            const currentText = d3.select(this).text();
            if (currentText === "-") {
              d3.select(this).text("+").style("font-size", "20px");
            } else {
              d3.select(this).text("-");
            }
          }

          else {

            // Remove all dashes from the link text but keep displayed text as is
            const cleanedText = d.replace(/ • /g, "").replace("Topic, ", "");  // Remove dashes for the link
            const searchSubject = cleanedText.replace(" ", "%20");  // Replace spaces with %20 for the URL

            const url = `https://www.primarysourcecoop.org/publications/${collection}/search#q%3D%2Bsubject%3A%22${searchSubject}%22`;

            // Open the URL in a new tab
            window.open(url, "_blank");

          }

        });

// Select all text elements and filter those starting with " •"
const NumHeaders = d3.selectAll("text")
  .filter(function () {
    return this.textContent.startsWith(" •");
  }).size();

expanded_rows = NumHeaders;

      let range = yAxis.range();

      xScale.range([range[0] + padding, range[1] - padding]).clamp(true);

      const xAxis = d3.axisBottom(xScale);
      
      const xGroup = g
        .append("g")
        .attr("class", "x axis")
        .attr("transform", translate(0, 0))
        .call(xAxis);

      xGroup.selectAll(".tick text")
        .attr("dy", "-1.5em");  // Move text up by 1em

      xGroup.selectAll(".tick line")
        .attr("y2", "-5")
        .attr("y1", height);

      const xAxisBottom = d3.axisBottom(xScale);  // Standard bottom axis
      const xGroupBottom = svg
        .append("g")
        .attr("class", "x axis bottom-axis")
        .attr("transform", translate(0, height + 20))  // Position at the bottom of the chart
        .call(xAxisBottom);

      xGroupBottom.selectAll(".tick line").attr("y2", "5");

      yGroup.on("offset", () => {
        range = yAxis.range();
        xScale.range([range[0] + padding, range[1] - padding]).clamp(true);
        xAxis.ticks(Math.min((range[1] - range[0]) / 70, 10));
        xGroup.call(xAxis);
        tasks
          .attr("transform", (d) => translate(xScale(starts(d)), yScale(labels(d))))
          .selectAll("rect")
          .attr("width", (d) => xScale(ends(d)) - xScale(starts(d)) || milestone_width)
          .call(d => trim_text(d, yAxis));

        yGroup.call(yAxis.draw_ticks, xScale.ticks().map(xScale));
      });

      xGroup.select(".domain").remove();
      xGroup.selectAll(".tick line").attr("stroke", "#AAA");

      const ticks = xScale.ticks().map(xScale);
      yGroup.call(yAxis.draw_ticks, ticks);

      let tasks = g.selectAll("g.task").data(data);

      tasks.exit().remove();


      const tasks_enter = tasks.enter().append("g").classed("task", true);


      tasks_enter
        .each(function (d) {
          const rowClass = labels(d).replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
          d3.select(this).classed(rowClass, true);  // Apply the dynamic row class
        })
        .append("rect")
        .style("opacity", 1.0)
        .attr("y", padding)
        .style("cursor", "pointer")
        .attr("height", yScale.bandwidth() - 2 * padding)
        .on("click", tip.show)
        .style("fill", pipe(names, cScale));


 




      tasks = tasks.merge(tasks_enter);

      tasks
        .attr("transform", (d) => translate(range[0], yScale(labels(d))))
        .selectAll("rect")
        .attr("width", 0);

      tasks
        .transition()
        .duration(duration)
        .attr("transform", (d) => translate(xScale(starts(d)), yScale(labels(d))))
        .selectAll("rect")
        .attr("width", (d) => xScale(ends(d)) - xScale(starts(d)) || milestone_width)
   

      if (today)
        g.append("path")
          .attr("stroke", "red")
          .attr("d", "M" + xScale(new Date()) + ",0.5V" + height);
    });

    hideTasksWithDashClass();

  }

  //chart.axis     = function(_) { return arguments.length? (axis  = _, chart): axis ; };
  chart.dates = function (_) {
    return arguments.length ? ((dates = _), chart) : dates;
  };
  chart.width = function (_) {
    return arguments.length ? ((const_width = _), chart) : const_width;
  };
  chart.today = function (_) {
    return arguments.length ? ((today = _), chart) : today;
  };
  chart.colors = function (_) {
    return arguments.length ? ((colors = _), chart) : colors;
  };
  chart.padding = function (_) {
    return arguments.length ? ((padding = _), chart) : padding;
  };
  chart.milestone_width = function (_) {
    return arguments.length ? ((milestone_width = _), chart) : milestone_width;
  };
  chart.reversed = function (_) {
    return arguments.length ? ((reversed = _), chart) : reversed;
  };
  chart.duration = function (_) {
    return arguments.length ? ((duration = _), chart) : duration;
  };



  return chart;

  function tooltip_html(event, d) {
    const format = pipe(d3.isoParse, d3.timeFormat("%Y"));
  
    // Header with the name and a horizontal rule
    const header = `<b>${names(d)}</b><hr style="margin: 2px 0 2px 0">${format(starts(d))}`;
  
    // Body with the formatted end date and duration (if applicable)
    const body = ends(d) - starts(d) 
      ? ` - ${format(ends(d))}, ${durationFormat(starts(d), ends(d))}` 
      : "";
  
    // Generate the dynamic URL for the docs link
    const subjectTitle = String(d[1]);
    let searchSubject = subjectTitle.replace(/ /g, "%20").replace("Topic,%20", "");
  
    const startDateStr = formatDate(d[2]);  // Format start date
    const endDateStr = formatDate(d[3]);    // Format end date
  
    const url = `https://www.primarysourcecoop.org/publications/${collection}/search#q%3D%2Bsubject%3A%22${searchSubject}%22%20%2Bdate_when%3A%5B${startDateStr}%20TO%20${endDateStr}%5D%7Crows=20%7Cstart=0%7Chl=true%7Chl.fl=text_merge%7Csort=date_when%20asc%7Cff=person_keyword;subject%7Cfl=id%20index%20title%20filename%20resource_group_name%20date_when%20date_to%20author%20recipient%20person_keyword%20subject%20doc_beginning`;
  
    // Add the clickable link to the tooltip
    const link = `<br><a href="${url}" target="_blank">${d[4]} Docs</a>`;
    // Combine the header, body, and link into the final tooltip content
    return `${header}${body}${link}`;
  }
}


