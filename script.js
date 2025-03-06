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

const bookContainer = document.querySelector('.book-container');

myLibrary.forEach((book) => {
    bookContainer.innerHTML += `
        ${book.title} <br> ${book.author} <br> ${book.pages} <br> ${isRead ? 'Read' : 'Not Read'} <br>
    `
})