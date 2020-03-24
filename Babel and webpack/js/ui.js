class UI {
  constructor() {
    this.quote = document.querySelector("#quotes");
    this.authorInput = document.querySelector("#author");
    this.quoteInput = document.querySelector("#text");
    // Adds id value
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".quote-submit");
    this.alertText = document.querySelector(".alert");
    // Default state, add a post
    this.formState = "add";
  }

  // List all posts in document
  showQuote(quotes) {
    let output = "";

    quotes.forEach(quote => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${quote.author}</h4>
          <p class="card-text">${quote.quote}</p>
          <a href="#" class="edit card-link" data-id="${quote.id}"><i class="fa fa-pencil mr-1"></i></a>
          <a href="#" class="delete card-link" data-id="${quote.id}"><i class="fa fa-remove mr-1"></i></a>
        </div>
      </div>`;
      this.quote.innerHTML = output;
    });
  }

  // Error, success message
  showAlert(message) {
    this.alertText.innerHTML = message;
    setTimeout(() => {
      this.alertText.innerHTML = "";
    }, 4000);
  }

  // Clear Input
  clearFields() {
    this.authorInput.value = "";
    this.quoteInput.value = "";
  }

  // Fill form on edit state
  fillForm(data) {
    this.authorInput.value = data.author;
    this.quoteInput.value = data.quote;
    // Hidden #id
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Clear ID input
  clearIdInput() {
    this.idInput.value = "";
  }

  changeFormState(type) {
    if (type === "edit") {
      // Edit "edit" button
      this.postSubmit.textContent = "Update Quote";
      this.postSubmit.classList = "quote-submit btn btn-warning btn-block";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel edit"));

      // Get parent
      const cardForm = document.querySelector(".card-form");

      // Get element to insert before
      const formEnd = document.querySelector(".form-end");

      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      // Only edit / add state
      // Edit button back
      this.postSubmit.textContent = "Post it";
      this.postSubmit.classList = "quote-submit btn btn-primary btn-block";
      // Remove cancel button if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear input fields
      this.clearFields();
    }
  }
}

export const ui = new UI();
