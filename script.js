class Library {
  constructor(libraryName) {
    this.libraryName = libraryName;
  }

  addBookToLibrary(newBook) {
    this.libraryName.push(newBook);
  }

  createBook(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    return newBook;
  }

  displayLibrary() {
    this.libraryName.forEach((book) => {
      libraryContainer.innerHTML += `
            <div class="book-container" data-id="${book.id}">
                <h2>${book.title}</h2>
                <p><span class="book-label">Author:</span> ${book.author}</p>
                <p><span class="book-label">Pages:</span> ${book.pages}</p>
                <button class="book-btn read-btn ${
                  book.isRead ? "is-read" : "not-read"
                }">${book.isRead ? "Read" : "Not Read"}</button>
                <button class="book-btn delete-btn">Remove</button>
            </div>
        `;
    });
  }

  createInitialBooks() {
    this.addBookToLibrary(
      this.createBook("Atomic Habits", "James Clear", "250", true)
    );
    this.addBookToLibrary(
      this.createBook("The Hobbit", "J.R.R Tolkien", "500", false)
    );
    this.addBookToLibrary(
      this.createBook("Influence", "Robert Cialdini", "180", false)
    );
  }
}

class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
    return this.isRead;
  }
}

const myLibrary = [];
const library = new Library(myLibrary);

//! DOM Elements
const libraryContainer = document.querySelector(".library");
const readButtons = document.querySelectorAll(".read-btn");
const deleteButtons = document.querySelectorAll(".delete-btn");
const addBookDialog = document.querySelector(".add-book-dialog");
const submitDialogButton = document.querySelector(".submit-dialog-btn");
const addBookButton = document.querySelector(".add-book-btn");
const closeDialogButton = document.querySelector(".close-dialog-btn");
const formInputs = document.querySelectorAll(".form-input");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const pagesInput = document.querySelector(".pages-input");
const readStatus = document.querySelector(".read-input");

//! Event Listeners
libraryContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("read-btn")) {
    const bookContainer = target.closest(".book-container");
    const bookId = bookContainer.dataset.id;
    const book = myLibrary.find((book) => book.id === bookId);

    const newReadStatus = book.toggleRead();
    if (newReadStatus) {
      target.classList.remove("not-read");
      target.classList.add("is-read");
    } else {
      target.classList.remove("is-read");
      target.classList.add("not-read");
    }
    target.textContent = newReadStatus ? "Read" : "Not Read";
  }

  if (target.classList.contains("delete-btn")) {
    const bookContainer = target.closest(".book-container");
    const bookId = bookContainer.dataset.id;
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    myLibrary.splice(bookIndex, 1);
    bookContainer.remove();
  }
});

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

submitDialogButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const newBook = library.createBook(title, author, pages, readStatus.checked);
  library.addBookToLibrary(newBook);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readStatus.checked = false;

  libraryContainer.innerHTML = "";
  library.displayLibrary();

  addBookDialog.close();
});

closeDialogButton.addEventListener("click", () => {
  addBookDialog.close();
});

//* Display the initial library
library.createInitialBooks();
library.displayLibrary();
