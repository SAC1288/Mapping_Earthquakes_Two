// Adding console.log to check to see if my code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.



// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
//    "type":"Feature",
 //   "properties":{
 //       "id":"3469",
 //       "name":"San Francisco International Airport",
 //       "city":"San Francisco",
 //       "country":"United States",
  //      "faa":"SFO",
  //      "icao":"KSFO",
 //       "alt":"13",
 //       "tz-offset":"-8",
 //       "dst":"A",
 //       "tz":"America/Los_Angeles"},
 //       "geometry":{
 //           "type":"Point",
  //          "coordinates":[-122.375,37.61899948120117]}}
//]};

//Accessing the airportt GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/SAC1288/Mapping_Earthquakes/main/majorAirports.json";

//Accessing the Toronto airline routes GeeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/SAC1288/Mapping_Earthquakes/main/torontoRoutes.json"

//Accessing Toronto neighborhoods GeoJSON URL.
//let torontoHoods = "https://raw.githubusercontent.com/SAC1288/Mapping_Earthquakes/main/torontoNeighborhoods.json"

let quake_data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  //  onEachFeaure: function(feature, layer) {
  //      console.log(layer);
  //      layer.bindPopup();
  //  }
//}).addTo(map);

//let myStyle = {
 //   color: '#ffffa1',
 //   weight: 2
//}

//Grabbing our GeoJSON data.
d3.json(quake_data).then(function(data) {
    console.log(data);
    function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
    function getColor(magnitude) {
        if (magnitude > 5) {
          return "#ea2c2c";
        }
        if (magnitude > 4) {
          return "#ea822c";
        }
        if (magnitude > 3) {
          return "#ee9c00";
        }
        if (magnitude > 2) {
          return "#eecc00";
        }
        if (magnitude > 1) {
          return "#d4ee00";
        }
        return "#98ee00";
      }
    function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        }
        return magnitude * 4;
      }
    L.geoJSON(data, {
//Turning each feature ino a circleMarker on the map.
pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.circleMarker(latlng);
},
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(map);
});
      //      style: myStyle,
  //      onEachFeature: (feature, layer) => {
  //          layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: "
  //                      + feature.properties.dst + "</h3>")
   //     }
  //  })
  //  .addTo(map);
//});

// d3.json(torontoData).then(function(data) {
//     console.log(data);
//     L.geoJSON(data, {
//         style: { color: "#ffffa1", weight: 2 },
//         onEachFeaure: function(feature, layer) {
//             layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: "
//             + feature.properties.dst + "</h3>");
//         }
//     })
//     .addTo(map);
// });


// Creaing the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Creating a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

let map = L.map('mapid', {
    center: [39.5, -98.5], 
    zoom: 3, 
    layers: [streets]
});

//Pass map layers into layer conrol and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);
// The adding my 'graymap' tile layer to the map.
//streets.addTo(map);