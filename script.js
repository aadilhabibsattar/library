const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead

    return {
        "id": this.id,
        "title": this.title,
        "author": this.author,
        "pages": this.pages,
        "isRead": this.isRead,
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(Book(title, author, pages, isRead));
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '500', true);
addBookToLibrary('Atomic Habits', 'James Clear', '250', true);
addBookToLibrary("Cant Hurt Me", 'David Goggins', '200', true);
addBookToLibrary('The 4-Hour Workweek', 'Tim Ferris', '180', false);
console.log(myLibrary)

const library = document.querySelector('.library');

myLibrary.forEach((book) => {
    library.innerHTML += `
        <div class="book-container">
            <h2>${book.title}</h2>
            <p><span class="book-label">Author:</span> ${book.author}</p>
            <p><span class="book-label">Pages:</span> ${book.pages}</p>
            <button class="book-btn read-btn not-read">${isRead ? 'Read' : 'Not Read'}</button>
            <button class="book-btn delete-btn">Remove</button>
        </div>
    `
})

const readButtons = document.querySelectorAll('.read-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');
const addBookButton = document.querySelector('.add-book-btn');

readButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle('is-read')
        button.textContent = button.textContent === 'Not Read' ? 'Read' : 'Not Read';
    })
})

deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const bookContainer = e.target.closest('.book-container');
        const bookId = bookContainer.dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId)
        myLibrary.splice(bookIndex, 1);

        bookContainer.remove();
    })
})