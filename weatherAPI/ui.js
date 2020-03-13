class UI {
  constructor() {
    this.location = document.getElementById("w-location");
    this.country = document.getElementById("w-country");
    this.string = document.getElementById("w-string");
    this.desc = document.getElementById("w-desc");
    this.temp = document.getElementById("w-temp");
    this.humidity = document.getElementById("w-humidity");
    this.wind = document.getElementById("w-wind");
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.country.textContent = weather.sys.country;
    this.string.textContent = `Weather: ${weather.weather[0].main}`;
    this.desc.textContent = `Description: ${weather.weather[0].description}`;
    this.temp.textContent = `Temperature: ${weather.main.temp} degrees`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity}`;
    this.wind.textContent = `Wind speed: ${weather.wind.speed}`;
  }
}
