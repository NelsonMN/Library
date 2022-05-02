class Book {
    constructor(title, author, pageCount, read) {
        this.title = title
        this.author = author
        this.pageCount = pageCount
        this.read = read
    }
}

class Library {
    constructor () {
        this.books = []
    }

    addBook(book) {
        this.books.push(book)
    }

    removeBook(book) {
        for (let i = 0; i < this.books.length; i++) {
            if (book.title === this.books[i].title) {
                this.books.splice(i, 1);
            }
        }
    }

    findBook(title) {
        for (let i = 0; i < this.books.length; i++) {
            if (title === this.books[i].title) {
                return this.books[i]
            }
        }
    }

    toggleRead(book) {
        for (let i = 0; i < this.books.length; i++) {
            if (book.title === this.books[i].title && book.read === "Read"){
                book.read = "Not Read";
                book.read = "Not Read";
            } else if (book.title === this.books[i].title && book.read === "Not Read") {
                book.read = "Read";
                this.books[i].read = "Read";
            }
        }
    }
}

const library = new Library()


// UI Functions:

function getBookInfo() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPageCount = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    let readStatus;
    if (read) {
        readStatus = "Read";
    } else {
        readStatus = "Not Read";
    }
    return new Book(bookTitle, bookAuthor, bookPageCount, readStatus)
};

function addBookToLibrary(book) {
    const bookCards = document.querySelector(".book-cards");
    const card = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');
    const readStatus = document.createElement('div');
    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const read = document.getElementById("read").checked;

    card.classList.add('card');
    cardTitle.classList.add('card-title');
    cardAuthor.classList.add('card-author');
    cardPages.classList.add('card-pages');
    readStatus.classList.add('card-read');
    readButton.classList.add('card-button');
    deleteButton.classList.add('card-delete');

    readButton.addEventListener("click", toggleReadStatus);
    deleteButton.addEventListener("click", deleteCard);

    cardTitle.textContent = `"${book.title}"`;
    cardAuthor.textContent = `By: ${book.author}`;
    cardPages.textContent = `${book.pageCount} pages`;
    readButton.textContent = "Read";
    deleteButton.textContent = "Delete";
    if (read) {
        readStatus.textContent = "Read";
    } else {
        readStatus.textContent = "Not Read";
    };

    library.addBook(book)
    card.append(cardTitle, cardAuthor, cardPages, cardPages, readStatus, readButton, deleteButton)
    bookCards.appendChild(card)
}

function toggleReadStatus(e) {
    const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
    library.toggleRead(library.findBook(title));
    const readStatus = e.target.previousSibling;
    if (readStatus.textContent == "Not Read") {
        readStatus.textContent = "Read";
    } else if (readStatus.textContent == "Read") {
        readStatus.textContent = "Not Read";
    }
}

function deleteCard(e) {
    const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
    library.removeBook(library.findBook(title));
    const card = e.target.parentNode;
    card.remove();
}


// Opening and Closing Modal form and submit button

const addBookButtons = document.querySelectorAll("[data-modal-target]");
const closeBookButtons = document.querySelectorAll("[data-close-button]");
const submitButton = document.querySelector('.add-book');
const overlay = document.getElementById("overlay");


addBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const form = document.querySelector(button.dataset.modalTarget);
        openForm(form);
    })
}) 

closeBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const form = button.closest(".form")
        closeForm(form);
        titleError.textContent = '';
        authorError.textContent = '';
        pagesError.textContent = '';
    })
})

const title = document.getElementById('title')
const titleError = document.querySelector('#title + span.error')

const author = document.getElementById('author')
const authorError = document.querySelector('#author + span.error')

const pages = document.getElementById('pages')
const pagesError = document.querySelector('#pages + span.error')

title.addEventListener('input', () => {
    if (title.validity.valid) {
        titleError.textContent = '';
        titleError.className = 'error';
    } else {
        showError();
    }
});

author.addEventListener('input', () => {
    if (author.validity.valid) {
        authorError.textContent = '';
        authorError.className = 'error';
    } else {
        showError();
    }
});


pages.addEventListener('input', function (event) {
    if (pages.validity.valid) {
        pagesError.textContent = '';
        pagesError.className = 'error';
    } else {
        showError();
    }
});
   
submitButton.addEventListener('click', (e) => {
    if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
        showError();
        e.preventDefault()
        e.stopImmediatePropagation()
    } else {
        e.preventDefault()
        const newBook = getBookInfo();
        addBookToLibrary(newBook);
        const formCard = document.getElementById("form-card");
        const form = document.querySelector(".form");
        formCard.reset();
        console.log(form)
        closeForm(form)
    }
});

function showError() {
    if (title.validity.valueMissing) {
        titleError.textContent = 'You need to enter a title!';
        titleError.className = 'error active';
    } if (author.validity.valueMissing) {
        authorError.textContent = 'You need to enter an author!';
        authorError.className = 'error active';
    } if (pages.validity.valueMissing) {
        pagesError.textContent = `You need to enter the page count!`;
        pagesError.className = 'error active';
    }
}

function openForm(form) {
    if (form == null) return
    form.classList.add("active");
    overlay.classList.add("active");
}

function closeForm(form) {
    if (form == null) return
    form.classList.remove("active");
    overlay.classList.remove("active");
}