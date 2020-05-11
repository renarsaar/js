const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const biggestCities = [
  "Tokyo",
  "Delhi",
  "Shanghai",
  "Sao Paulo",
  "Mexico City",
  "Cairo",
  "Mumbai",
  "Beijing",
  "Dhaka",
  "New York City",
];

// Store list items
const listItems = [];

// Index of each list item
let dragStartIndex;

createList();

// Create list items and insert into DOM
function createList() {
  // Use array values from cities array
  [...biggestCities]
    // Change into object, add random value
    .map((a) => ({ value: a, sort: Math.random() }))
    // Sort by random value
    .sort((a, b) => a.sort - b.sort)
    // Turn it back into array of strings
    .map((a) => a.value)
    // Loop through and insert
    .forEach((city, index) => {
      const listItem = document.createElement("li");
      // Custom atribute in html5 data-...
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="city-name">${city}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list items
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

// Check list item order
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const cityName = listItem.querySelector(".draggable").innerText.trim();

    if (cityName !== biggestCities[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
check.addEventListener("click", checkOrder);
