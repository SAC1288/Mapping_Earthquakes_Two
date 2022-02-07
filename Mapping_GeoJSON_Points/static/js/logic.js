// Adding console.log to check to see if my code is working.
console.log("Hello World!");

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
let airportData = "https://raw.githubusercontent.com/SAC1288/Mapping_Earthquakes/main/majorAirports.json";


// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  //  onEachFeaure: function(feature, layer) {
  //      console.log(layer);
  //      layer.bindPopup();
  //  }
//}).addTo(map);

//Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJSON(data).addTo(map);
});


// Creaing the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Creating the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Creating a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

let map = L.map('mapid', {
    center: [30, 30], 
    zoom: 2, 
    layers: [streets]
});

//Pass map layers into layer conrol and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);
// The adding my 'graymap' tile layer to the map.
//streets.addTo(map);