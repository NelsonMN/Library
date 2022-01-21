let myLibrary = [
    {title: "The Great Gatsby", author: "F. Scott Fitzgerald", pageCount: "208", read: "no"},
    {title: "Nineteen Eighty-Four", author: "George Orwell", pageCount: "328", read: "no"},
    {title: "To Kill A Mockingbird", author: "Harper Lee", pageCount: "281", read: "yes"},
    {title: "The 5 AM Club", author: "Robin Sharma", pageCount: "336", read: "yes"},
    {title: "Atomic Habits", author: "James Clear", pageCount: "320", read: "yes"}
];

function Book(title, author, pageCount, read) {
    this.title = title
    this.author = author
    this.pageCount = pageCount
    this.read = read
}

function newBook() {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPageCount = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    return new Book(bookTitle, bookAuthor, bookPageCount, read)
}

function addBookToLibrary(book) {
    const bookCards = document.querySelector(".book-cards")
    const card = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');
    const cardRead = document.createElement('div');
    const cardButton = document.createElement('button');
 
    card.classList.add('card')
    cardTitle.classList.add('card-title')
    cardAuthor.classList.add('card-author')
    cardPages.classList.add('card-pages')
    cardRead.classList.add('card-read')
    cardButton.textContent = "Read"

    cardTitle.textContent = `"${book.title}"`
    cardAuthor.textContent = book.author;
    cardPages.textContent = `${book.pages} pages`
    const read = document.getElementById("read").checked
    if (read) {
        cardRead.textContent = "Read"
    } else {
        cardRead.textContent = "Not Read"
    }

    card.append(cardTitle, cardAuthor, cardPages, cardPages, cardRead, cardButton)
    bookCards.appendChild(card)
}




const displayBooks = function() {
    for (i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i])
    }
}

// Opening and Closing Modal form

const addBookButtons = document.querySelectorAll("[data-modal-target]")
const closeBookButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")

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