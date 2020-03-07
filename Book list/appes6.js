// BOOK CONSTRUCTOR
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // ADD BOOK TO LIST
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);
  }

  // ERROR/SUCCESS ALERT
  showAlert(message, className) {
    // Create a div
    const div = document.createElement("div");
    // Add claases = alert && another one that is passed in to the function == success/error
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.getElementById("book-form");
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // DELETE BOOK
  deleteBook(target) {
    // Target class "delete"
    if (target.className === "delete") {
      // Target whole table row
      target.parentElement.parentElement.remove();
    }
  }

  // CLEAR FIELDS
  clearFields() {
    title.value = "";
    author.value = "";
    isbn.value = "";
  }
}

// Local Storage
class Store {
  // Fetch from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      // Into object
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  // Display books
  static displayBooks() {
    // Get books
    const books = Store.getBooks();

    // Loop through books
    books.forEach(function(book) {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    // Get Books
    const books = Store.getBooks();

    // Add to array
    books.push(book);

    // Store
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    // Get Books
    const books = Store.getBooks();

    // Loop through books
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks());

// Event listener for add a book
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book object
  const book = new Book(title, author, isbn);

  // Instantiate UI object
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // Success alert
    ui.showAlert("Book has been added", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault(); // prevent reload page on submit
});

// Event listener for delete a book
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate UI object
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from local storage // Target ISBN number
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Success alert
  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
