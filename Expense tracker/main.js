// UI VARS
const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("money-plus"),
  moneyMinus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount"),
  alert = document.getElementById("alert");

// Modal & Edit form VARS
const toggle = document.getElementById("toggle"),
  modal = document.getElementById("modal"),
  editSubmit = document.getElementById("edit-submit"),
  editAlert = document.getElementById("edit-alert"),
  editText = document.getElementById("edit-text"),
  editAmount = document.getElementById("edit-amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Submit transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert.innerHTML = "Please Add a Text and Amount";
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
  return Math.floor(Math.random() * 100000000);
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
  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span>
  <i 
    class="delete-btn fas fa-trash" 
    onclick="removeTransaction(${transaction.id})"
  ></i> 
  <i 
    class="edit-btn edit fas fa-pencil-alt"
    onclick="editTransaction(${transaction.id})"
  ></i>`;

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

  updateLocalStorage();

  init();
}

// Edit transaction
function editTransaction(id) {
  // Open modal with data inside form
  modal.classList.add("show-modal");

  // Add id to hidden field
  document.getElementById("transactionID").value = id;

  // Filter transactions with current id
  const editTransaction = transactions.filter(
    (transaction) => transaction.id === id
  );

  // Fill fields with values
  editText.value = editTransaction[0].text;
  editAmount.value = editTransaction[0].amount;
}

function submitEdit(e) {
  e.preventDefault();

  // Hidden ID
  const id = document.getElementById("transactionID").value;

  // Check input values
  if (editAmount.value.trim() === "" || editText.value.trim() === "") {
    editAlert.innerHTML = "Please Add a Text and Amount";
  } else {
    // Edited item
    const newItem = {
      id: +id,
      text: editText.value,
      amount: +editAmount.value,
    };

    // Find index of an item
    const index = transactions.findIndex((item) => item.id == id);

    // Replace the item by index
    transactions.splice(index, 1, newItem);

    // Add to DOM
    addTransactionDOM(newItem);

    // Remove old element from DOM
    const li = document.querySelector(`li:nth-child(${index + 1})`);
    li.remove();

    // Move new item from the end to the old place
    const newLi = document.querySelector("li:last-child");
    list.insertBefore(newLi, list.childNodes[`${index}`]);

    // Update values
    updateValues();

    // Update LS
    updateLocalStorage();

    // Close modal
    modal.classList.remove("show-modal");

    // Success alert
    alert.innerHTML = "Transaction edited";

    setTimeout(() => {
      alert.innerHTML = "";
    }, 4000);
  }
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

// Init on DOM load
init();

// Event listeners
form.addEventListener("submit", addTransaction);
editSubmit.addEventListener("click", submitEdit);

// TOGGLE ASIDE
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-aside");

  document.body.classList.contains("show-aside")
    ? (toggle.innerHTML = `<i class="fas fa-arrow-left"></i>`)
    : (toggle.innerHTML = `<i class="fas fa-info-circle"></i>`);
});

// Hide Modal
document.getElementById("close").addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// Hide Modal on Outside CLick
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
