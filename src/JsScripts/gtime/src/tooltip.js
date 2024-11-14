import * as d3 from "d3";

const css =
  "div.tooltip {\
        position: absolute;\
        text-align: center;\
        padding: 10px 20px 10px 10px; /* Extra padding on the right for the X button */\
        background: white;\
        border: 1px solid #AAA;\
        border-radius: 2px;\
        pointer-events: auto;\
        min-width: 150px; /* Minimum width to accommodate shorter text */\
        white-space: nowrap; /* Prevent text wrapping */\
      }\
      div.tooltip .close-btn {\
        position: absolute;\
        top: 5px;\
        right: 5px;\
        padding: 2px 5px;\
        cursor: pointer;\
        font-weight: bold;\
        color: #333;\
        font-size: 14px;\
      }\
      div.tooltip .close-btn:hover {\
        color: red;\
      }";

export default function (html_func) {
  // Append CSS if it hasn't been added
  d3.select("head").selectAll("#tooltip").data([1]).enter().append("style").attr("id", "tooltip").text(css);

  let selection;

  // Show function with close button
  function show(event) {
    // Remove any existing tooltip to prevent layering issues
    if (selection) selection.remove();

    // Create the tooltip div
    selection = d3.select("body").append("div").attr("class", "tooltip");

    // Set content with close button in the top right corner
    selection
      .html(`<span class="close-btn">×</span>${html_func.apply(null, arguments)}`)
      .style("opacity", 0.85)
      .style("top", (event.pageY - 60) + "px");

    // Calculate width and adjust left to center it horizontally
    const tooltipWidth = selection.node().getBoundingClientRect().width;
    selection.style("left", (event.pageX - tooltipWidth / 2) + "px");

    // Add click event to close button to remove tooltip
    selection.select(".close-btn").on("click", hide);

    // Add click event listener on the document to hide tooltip on outside click
    document.addEventListener("click", outsideClickListener);
  }

  // Hide function to completely remove the tooltip
  function hide() {
    if (selection) {
      selection.transition().duration(100).style("opacity", 0).remove();
      selection = null; // Clear reference
      document.removeEventListener("click", outsideClickListener); // Remove outside click listener
    }
  }

  // Function to detect clicks outside the tooltip and outside specific rects, and hide it
  function outsideClickListener(event) {
    const isClickInsideTooltip = selection && selection.node().contains(event.target);

    // Check if the clicked element is a rect within a g element with the class 'task'
    const isClickOnTaskRect =
      event.target.tagName === 'rect' &&
      event.target.parentNode.classList.contains('task');

    if (!isClickInsideTooltip && !isClickOnTaskRect) {
      hide();
    }
  }

  // Return show and hide functions for use
  return { show, hide };
}
