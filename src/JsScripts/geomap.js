function Leafmap(files, collection) {
    // Makes map and sets it to Boston (.setView([long, lat], zoom))
    var map = L.map('map').setView([42.3601, -71.0589], 12);
    // /*
    // Sets background image for map and attribution. There are probably some cool directions we can go with this 
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
        maxZoom: 16,
    }).addTo(map);

    // The marker cluster group (all markers are one cluster)
    const markers = L.markerClusterGroup();
    // Keeps track of info to be used later for legend 
    const removedMarkers = {};
    const legendData = [];
    let openPopup = null; // Track the currently open popup

    // Each file is 
    files.forEach((file, index) => {
        // Assuming first 4 chars in a file name are the year 
        const year = file.substring(0, 4);
        // To avoid needing custom icons, I just adjust the hue for each year. Added benefit that it allows users to interpret how far apart two icons are 
        const hueRotation = index * 30;
        // ALlows the legend to have the info needed (year and the amount to adjust the icon hue by)
        legendData.push({ year, hueRotation });

        // Fetches the data 
        fetch("/psc/data/" + collection + "/geo/" + file)
            .then(response => response.json())
            // Operates on it 
            .then(data => {
                // Add markers to the cluster group from the GeoJSON data
                const geoJsonLayer = L.geoJSON(data, {
                    pointToLayer: function (feature, latlng) {
                        const marker = L.marker(latlng);

                        // Changes color by adjusting hue by the amount specified above 
                        marker.on('add', function () {
                            marker._icon.style.filter = `hue-rotate(${hueRotation}deg)`;
                        });

                        // This is the popup 
                        const dateline = feature.properties.dateline;
                        const date = feature.properties.date;
                        const place = feature.properties.entity;
                        const link = feature.properties.link;

                        const popupContent = `
                            <div style="text-align: center; font-weight: bold;">
                                ${dateline}
                                ${link ? `<div><a href="${link}" target="_blank">View entry</a></div>` : ''}
                            </div>
                            <div style="text-align: left; margin-top: 5px;">
                                <strong>Date:</strong> ${date}
                            </div>
                            <div style="text-align: left; margin-top: 5px;">
                                <strong>Place:</strong> ${place}
                            </div>
                        `;


                        // Bind the popup with the above
                        marker.bindPopup(popupContent);

                        // Handle popup opening and tracking the currently open popup
                        marker.on('click', function () {

                            if (openPopup) openPopup.closePopup(); // Close any open popup

                            marker.openPopup(); // Open the clicked marker's popup
                            openPopup = marker; // Track the currently open popup
                        });

                        return marker;
                    }
                });

                // Add the geoJson layer to the cluster group and the map
                markers.addLayer(geoJsonLayer);
                // Add the marker cluster group to the map
                map.addLayer(markers);
            });
    });

    // Close the open popup when clicking on the map
    map.on('click', function () {
        if (openPopup) {
            openPopup.closePopup();
            openPopup = null; // Reset the open popup tracker
        }
    });

    createInfoIcon(map); // Add info icon to the map
    createLegend(legendData, map, markers, removedMarkers);
}


function createLegend(legendData, map, markers, removedMarkers) {
    // Keeps the legend in the bottom right 
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        // Sets up the div and gives it the title of legend 
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = '<h4>Legend</h4>';

        legendData.forEach(item => {
            const legendItem = L.DomUtil.create('div', 'legend-item', div);

            // image is sourced from leaflet.. the hue filter is appled based off the legend dict
            legendItem.innerHTML = `
                <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" 
                     style="filter: hue-rotate(${item.hueRotation}deg);">
                <span>${item.year}</span>
            `;
            // toggles markers on click 
            legendItem.addEventListener('click', () => toggleMarkersByYear(item.year, legendItem, markers, removedMarkers));
        });
        return div;
    };
    legend.addTo(map);
}

function hideMarkersByYear(targetYear, markers, removedMarkers) {

    // If markers for the year are not already stored, make a space for them 
    if (!removedMarkers[targetYear]) {
        removedMarkers[targetYear] = [];
    }

    // Iterate through all markers in the cluster group
    markers.eachLayer(function (layer) {

        // extracts the year of each marker from its data 
        const markerYear = layer.feature.properties.date.substring(0, 4);

        // If the marker's year matches the target year remove it and store the value for later 
        if (markerYear === targetYear) {
            removedMarkers[targetYear].push(layer); // store

            markers.removeLayer(layer); // Remove
        }

    });

    // Refresh clusters to update count
    markers.refreshClusters();
}

function showMarkersByYear(targetYear, markers, removedMarkers) {
    // Check if there are removed markers for the target year

    removedMarkers[targetYear].forEach(marker => {
        markers.addLayer(marker); // Re-add marker to the cluster group
    });

    // Clear the stored markers for the year since they are restored
    delete removedMarkers[targetYear];


    // Refresh clusters to update count
    markers.refreshClusters();

}

function updateLegendItemStyle(legendItem, isHidden) {
    if (isHidden) {
        legendItem.classList.add('filtered-out'); //hide 
    } else {
        legendItem.classList.remove('filtered-out'); // unhide
    }
}

function toggleMarkersByYear(targetYear, legendItem, markers, removedMarkers) {

    if (removedMarkers[targetYear] && removedMarkers[targetYear].length > 0) {
        // If markers are hidden, show them and their legend entry
        showMarkersByYear(targetYear, markers, removedMarkers);
        updateLegendItemStyle(legendItem, false);
    } else {
        // If markers are shown, hide them  and their legend entry
        hideMarkersByYear(targetYear, markers, removedMarkers);
        updateLegendItemStyle(legendItem, true);
    }
}

function createInfoIcon(map) {
    const infoIcon = L.control({ position: 'topright' });

    infoIcon.onAdd = function () {
        const div = L.DomUtil.create('div', 'info-icon');
        div.innerHTML = `
            <i class="fas fa-info-circle" 
               style="font-size: 24px; cursor: pointer; color: white;"></i>
        `;
        div.onclick = openInfoPopup;
        return div;
    };

    infoIcon.addTo(map);
}

function openInfoPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'info-popup-overlay';
    overlay.innerHTML = `
        <div class="info-popup-content">
        <h2 style="text-align: center;">How to Use the Map</h2>

        <p style="text-align: left;">This interactive map uses GeoJSON to showcase a figure's location throughout time. You can interact with it using the following features:</p>
        
        <ul style="text-align: left;">
            <li><strong>Markers:</strong> Click on any marker to see detailed information, including the date, location, and a link to the original entry.</li>
            <li><strong>Legend:</strong> The legend at the bottom right helps you identify markers by year. Click on a year in the legend to filter markers from that year.</li>
            <li><strong>Clustered Markers:</strong> Some markers are grouped in clusters. Click on a cluster to zoom in and view individual markers.</li>
        </ul>

        <p style="text-align: left;">
            Use the <strong>information icon</strong> in the top-right corner to revisit these instructions at any time.
        </p>
            <button onclick="closeInfoPopup()">Close</button>
        </div>
    `;
    document.querySelector('#map').appendChild(overlay);
}

function closeInfoPopup() {
    const overlay = document.querySelector('.info-popup-overlay');
    if (overlay) overlay.remove();
}



