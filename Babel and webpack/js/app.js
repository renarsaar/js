import { http } from "./http";
import { ui } from "./ui";

// Get quotes on dom load
document.addEventListener("DOMContentLoaded", getQuotes);

// Get quotes
function getQuotes() {
  http
    .get("http://localhost:3000/quotes")
    // async returns a promise
    .then(data => ui.showQuote(data))
    .catch(err => console.log(err));
}

//
// Listen for submit quote
document.querySelector(".quote-submit").addEventListener("click", submitQuote);

// Submit quotes
function submitQuote() {
  const author = ui.authorInput.value;
  const quote = ui.quoteInput.value;
  const id = ui.idInput.value;

  const data = {
    author,
    quote
  };

  // Validate Form data
  if (author === "" || quote === "") {
    ui.showAlert("Please fill in al fields");
  } else {
    // Check for hidden ID input value
    if (id === "") {
      // Create/Add a post
      // Post request
      http
        .post("http://localhost:3000/quotes", data)
        .then(data => {
          ui.showAlert("Post added");
          ui.clearFields();
          // Call posts including the new one
          getQuotes();
        })
        .catch(err => console.log(err));
    } else {
      // Edit post // Putrequest
      http.put(`http://localhost:3000/quotes/${id}`, data).then(data => {
        ui.showAlert("Post edited");
        // Change the state back to "add"
        ui.changeFormState("add");
        // Call posts including the new one
        getQuotes();
      });
    }
  }
}

//
// Listen for Delete quote
document.querySelector("#quotes").addEventListener("click", deleteQuote);

// Delete Quote
function deleteQuote(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    // dataset = data-id
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are You Sure?")) {
      http
        .delete(`http://localhost:3000/quotes/${id}`)
        .then(data => {
          ui.showAlert("Post Deleted");
          getQuotes();
        })
        .catch(err => console.log(err));
    }
  }
}

//
// Listen for edit state
document.querySelector("#quotes").addEventListener("click", enableEdit);

// Edit quote state
function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("edit")) {
    // dataset = data-id
    const id = e.target.parentElement.dataset.id;
    const author =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const quote = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      author,
      quote
    };

    // Fill form with current post
    ui.fillForm(data);
  }
}

//
// Listen for cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
