// UI VARS
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const alert = document.getElementById("alert");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Submit transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert.innerHTML = "Please Add a text and Amount";
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    // Push to array
    transactions.push(transaction);

    // Add to DOM
    addTransactionDOM(transaction);

    // Update values
    updateValues();

    updateLocalStorage();

    // Clear inputs
    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

// Display transactions to DOM list
function addTransactionDOM(transaction) {
  // Amount sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // Create item
  const item = document.createElement("li");

  // Add class based on amount
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Add text
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class='delete-btn' onclick='removeTransaction(${
    transaction.id
  })'>x</button> `;

  // Add to DOM
  list.appendChild(item);
}

// Update Balance Section
function updateValues() {
  // Balance
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  balance.innerText = `${total} €`;

  // Income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  moneyPlus.innerText = `+${income}€`;

  // Expence
  const expence = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  moneyMinus.innerText = `${expence}€`;
}

// Remove transacition by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  console.log(transactions);
  updateLocalStorage();

  init();
}

// Update Local Storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
