let myLibrary = [
    {title: "The Great Gatsby", author: "F. Scott Fitzgerald", pageCount: "208", read: "no"},
    {title: "Nineteen Eighty-Four", author: "George Orwell", pageCount: "328", read: "no"},
    {title: "To Kill A Mockingbird", author: "Harper Lee", pageCount: "281", read: "yes"},
    {title: "The 5 AM Club", author: "Robin Sharma", pageCount: "336", read: "yes"},
    {title: "Atomic Habits", author: "James Clear", pageCount: "320", read: "yes"}
];


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

const removeBook = function(book) {
    for (i = 0; i < myLibrary.length; i++) {
        if (book.title === myLibrary[i].title){
            myLibrary.splice(myLibrary[i],1)
        }}   
};

const toggleRead = function(book) {
    for (i = 0; i < myLibrary.length; i++) {
        if (book.title === myLibrary[i].title && book.read === myLibrary[i].read && book.read === "yes"){
            myLibrary[i].read = "no";
        } else if (book.title === myLibrary[i].title && book.read === myLibrary[i].read && book.read === "no") {
            myLibrary[i].read = "yes";
        }}
};


// UI Functions:

function getBookInfo() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPageCount = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    return new Book(bookTitle, bookAuthor, bookPageCount, read)
};

function addBookToLibrary(book) {
    const bookCards = document.querySelector(".book-cards")
    const card = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');
    const cardRead = document.createElement('div');
    const cardButton = document.createElement('button');
    const cardDelete = document.createElement('button');
    const read = document.getElementById("read").checked;
 
    card.classList.add('card');
    cardTitle.classList.add('card-title');
    cardAuthor.classList.add('card-author');
    cardPages.classList.add('card-pages');
    cardRead.classList.add('card-read');
    cardButton.classList.add('card-button');
    cardDelete.classList.add('card-delete')

    cardTitle.textContent = `"${book.title}"`;
    cardAuthor.textContent = `By: ${book.author}`;
    cardPages.textContent = `${book.pageCount} pages`;
    cardButton.textContent = "Read";
    cardDelete.textContent = "Delete";
    if (read) {
        cardRead.textContent = "Read";
    } else {
        cardRead.textContent = "Not Read";
    };

    addBook(book)
    card.append(cardTitle, cardAuthor, cardPages, cardPages, cardRead, cardButton, cardDelete)
    bookCards.appendChild(card)
}


// Opening and Closing Modal form and submit button

const addBookButtons = document.querySelectorAll("[data-modal-target]");
const closeBookButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const submitButton = document.querySelector('.add-book');

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
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
    formCard = document.getElementById("form-card")
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