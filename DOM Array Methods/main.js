const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");

// All of the people array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add $
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}

// Doubles €
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by €
function sortByMillionaires() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function filterMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Reduce = add everything together
// return single value = total wealth
function entireWealth() {
  // Double
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)

  // Output to DOM
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(object) {
  // Push on to end of data array
  data.push(object);

  updateDOM();
}

// Update DOM
// If nothing is passed in = use data array
function updateDOM(providedData = data) {
  // Clear the main div so it will replace what is there
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  // (item, index(0, 1, 2), arr(entire array))
  providedData.forEach((item) => {
    // Create <div>, add class
    const element = document.createElement("div");
    element.classList.add("person");

    // Html
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

    // Insert
    main.appendChild(element);
  });
}

// Format number as $
function formatMoney(num) {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + " €";  // 12,345.67
}

// Event listeners
addUser.addEventListener("click", getRandomUser);

double.addEventListener("click", doubleMoney);

sort.addEventListener("click", sortByMillionaires);

showMillionaires.addEventListener("click", filterMillionaires);

calculateWealth.addEventListener("click", entireWealth);

