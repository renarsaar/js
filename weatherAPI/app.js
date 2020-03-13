// Init Storage class
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather class
const weather = new Weather(weatherLocation.city);

// Init UI class
const ui = new UI();

// Get weather on DOM Page load
document.addEventListener("DOMContentLoaded", getWeather);

// Change location event
document.getElementById("w-change-btn").addEventListener("click", e => {
  const city = document.getElementById("city").value;

  // Change location
  weather.changeLocation(city);

  // Set location in LS
  storage.setLocationData(city);

  // Get weather again and display
  getWeather();

  // Close modal
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
