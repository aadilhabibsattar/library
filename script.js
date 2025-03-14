const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

console.log(myLibrary)

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
    return this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

addBookToLibrary('Atomic Habits', 'James Clear', '250', true);
addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '500', false);
addBookToLibrary('The 4-Hour Workweek', 'Tim Ferris', '180', false);

const library = document.querySelector('.library');

function displayLibrary () {
    myLibrary.forEach((book) => {
        library.innerHTML += `
            <div class="book-container" data-id="${book.id}">
                <h2>${book.title}</h2>
                <p><span class="book-label">Author:</span> ${book.author}</p>
                <p><span class="book-label">Pages:</span> ${book.pages}</p>
                <button class="book-btn read-btn ${book.isRead ? 'is-read' : 'not-read'}">${book.isRead ? 'Read' : 'Not Read'}</button>
                <button class="book-btn delete-btn">Remove</button>
            </div>
        `
    })   
};

displayLibrary();

const readButtons = document.querySelectorAll('.read-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

library.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('read-btn')) {
        const bookContainer = target.closest('.book-container');
        const bookId = bookContainer.dataset.id;
        const book = myLibrary.find(book => book.id === bookId);

        const newReadStatus = book.toggleRead();
        if (newReadStatus) {
            target.classList.remove('not-read');
            target.classList.add('is-read');
        } else {
            target.classList.remove('is-read');
            target.classList.add('not-read');
        }
        target.textContent = newReadStatus ? 'Read' : 'Not Read';
    }
    
    if (target.classList.contains('delete-btn')) {
        const bookContainer = target.closest('.book-container');
        const bookId = bookContainer.dataset.id;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        
        myLibrary.splice(bookIndex, 1);
        bookContainer.remove();
    }
});

//! Add book form
const addBookDialog = document.querySelector('.add-book-dialog')
const submitDialogButton = document.querySelector('.submit-dialog-btn')
const addBookButton = document.querySelector('.add-book-btn');
const closeDialogButton = document.querySelector('.close-dialog-btn');

const formInputs = document.querySelectorAll('.form-input')
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const readStatus = document.querySelector('.read-input');

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

submitDialogButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    
    addBookToLibrary(title, author, pages, readStatus.checked)
    
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatus.checked = false;

    library.innerHTML = '';
    displayLibrary();

    addBookDialog.close(); 
})

closeDialogButton.addEventListener("click", () => {
    addBookDialog.close();
});