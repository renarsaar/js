class Storage {
  constructor() {
    this.city;
    this.defaultCity = "Tallinn";
  }

  getLocationData() {
    if (localStorage.getItem("city") === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem("city");
    }
    return {
      city: this.city,
      state: this.state
    };
  }

  setLocationData(city) {
    // City as a string
    localStorage.setItem("city", city);
  }
}
