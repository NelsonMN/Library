let myLibrary = [];

// Data Structures

function Book(title, author, pageCount, read) {
    this.title = title
    this.author = author
    this.pageCount = pageCount
    this.read = read
}

const addBook = function(book){
    myLibrary.push(book)
};

const findBook = function(title) {
    for (i = 0; i < myLibrary.length; i++) {
        if (title === myLibrary[i].title) {
            return myLibrary[i]
        }}
};

const removeBook = function(book) {
    for (i = 0; i < myLibrary.length; i++) {
        if (book.title === myLibrary[i].title) {
            myLibrary.splice(i, 1)
        }}   
};

const toggleRead = function(book) {
    for (i = 0; i < myLibrary.length; i++) {
        if (book.title === myLibrary[i].title && book.read === "Read"){
            book.read = "Not Read";
            myLibrary[i].read = "Not Read";
        } else if (book.title === myLibrary[i].title && book.read === "Not Read") {
            book.read= "Read";
            myLibrary[i].read = "Read";
        }}
};


// UI Functions:

function getBookInfo() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPageCount = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    let readStatus;
    if (read) {
        readStatus = "Read"
    } else {
        readStatus = "Not Read"
    }
    return new Book(bookTitle, bookAuthor, bookPageCount, readStatus)
};

function addBookToLibrary(book) {
    const bookCards = document.querySelector(".book-cards")
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
    deleteButton.classList.add('card-delete')

    readButton.addEventListener("click", toggleReadStatus)
    deleteButton.addEventListener("click", deleteCard)

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

    addBook(book)
    card.append(cardTitle, cardAuthor, cardPages, cardPages, readStatus, readButton, deleteButton)
    bookCards.appendChild(card)
}

function toggleReadStatus(e) {
    const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
    toggleRead(findBook(title))
    const readStatus = e.target.previousSibling;
    if (readStatus.textContent == "Not Read") {
        readStatus.textContent = "Read";
    } else if (readStatus.textContent == "Read") {
        readStatus.textContent = "Not Read";
    }
}

function deleteCard(e) {
    const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
    removeBook(findBook(title));
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
        const form = document.querySelector(button.dataset.modalTarget)
        openForm(form)
    })
}) 

closeBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const form = button.closest(".form")
        closeForm(form)
    })
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const newBook = getBookInfo();
    addBookToLibrary(newBook);
    const formCard = document.getElementById("form-card");
    formCard.reset()
})


function openForm(form) {
    if (form == null) return
    form.classList.add("active")
    overlay.classList.add("active")
}

function closeForm(form) {
    if (form == null) return
    form.classList.remove("active")
    overlay.classList.remove("active")
}