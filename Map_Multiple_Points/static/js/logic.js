// Adding console.log to check to see if my code is working.
console.log("Hello World!");

//Creating the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

//Loop through the cities array and createt one marker for each city.

let cityData = cities;

  cityData.forEach(function(city) {
      console.log(city)
      L.circleMarker(city.location, {
          radius: city.population/100000
      })
      .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
      .addTo(map);
  })


//Adding a circle to Denver, CO.
L.circle([39.7392, -104.9903], {
    radius:10000,
    color: "red",
}).addTo(map);


// Creaing the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// The adding my 'graymap' tile layer to the map.
streets.addTo(map);