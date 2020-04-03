// UI Vars
const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const price = document.getElementById("price");
const selectMovie = document.getElementById("movie");
let moviePrice = +selectMovie.value;

populateUI();

// Save selected Movie Index & Price to LS
function setMovieData(movieIndex, ticketPrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedTicketPrice", ticketPrice);
}

// Update price and count
function updateSelectedCount() {
  // Return all selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Local Storage
  // Copy selected seats into array
  // Map through array
  // Return a new array indexes

  // Save seats to LS
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Get length of selected seats
  const selectedSeatsCount = selectedSeats.length;

  // Count & Price
  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * moviePrice;
}

// Get LS data and show to UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // Check if LS is empty
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // -1 === not there
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    selectMovie.selectedIndex = selectedMovieIndex;
  }
}

// Choose a movie event
selectMovie.addEventListener("change", e => {
  moviePrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Choose a seat event
seatContainer.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // Toggle = add and remove on second click
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Call count and total on page load
updateSelectedCount();
