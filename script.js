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
                this.books[i].read = "Not Read";
            } else if (book.title === this.books[i].title && book.read === "Not Read") {
                book.read = "Read";
                this.books[i].read = "Read";
            }
        }
    }
}

const library = new Library()


// UI Functions:

const loggedIn = document.getElementById('loggedIn')
const loggedOut = document.getElementById('loggedOut')
const nav = document.querySelector('.signed-in')

const changeNav = (user) => {
    const personalInfoDiv = document.createElement('div');
    const nameTag = document.createElement('h1');
    const imgTag = document.createElement('img');
    personalInfoDiv.classList.add('personal-info-div');
    imgTag.classList.add('img-icon')
    personalInfoDiv.append(imgTag, nameTag);
    
    if (user) {
        loggedIn.classList.remove('active')
        loggedOut.classList.add('active')
        nameTag.textContent = auth.currentUser.displayName;
        imgTag.src = auth.currentUser.photoURL;
        nav.prepend(personalInfoDiv);
    } else {
        const personalInfo = document.querySelector('.personal-info-div');
        if (personalInfo) {
            personalInfo.remove()
        }
        loggedIn.classList.add('active')
        loggedOut.classList.remove('active')
    }
}

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
    if (auth.currentUser) {
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
        addBookToDatabase(book)
        card.append(cardTitle, cardAuthor, cardPages, cardPages, readStatus, readButton, deleteButton)
        bookCards.appendChild(card)
    } else {
        alert('Please sign in with Google')
    }
    
}

function toggleReadStatus(e) {
    if (auth.currentUser) {
        const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
        const book = library.findBook(title)
        library.toggleRead(book);
        const readStatus = e.target.previousSibling;
        if (readStatus.textContent == "Not Read") {
            readStatus.textContent = "Read";
        } else if (readStatus.textContent == "Read") {
            readStatus.textContent = "Not Read";
        }
        toggleReadFromDatabase(book)
    } else {
        alert('Please sign in with Google')
    }
}

function deleteCard(e) {
    if (auth.currentUser) {
        const title = e.target.parentNode.firstChild.textContent.replaceAll('"', '');
        const book = library.findBook(title)
        library.removeBook(book);
        removeBookFromDatabase(book)
        const card = e.target.parentNode;
        card.remove();
    } else {
        alert('Please sign in with Google')
    }
}


// Opening and Closing Modal form and submit button

const addBookButtons = document.querySelectorAll("[data-modal-target]");
const closeBookButtons = document.querySelectorAll("[data-close-button]");
const submitButton = document.querySelector('.add-book');
const overlay = document.getElementById("overlay");


addBookButtons.forEach(button => {
    button.addEventListener("click", () => {
        const form = document.querySelector(button.dataset.modalTarget);
        if (auth.currentUser) {
            openForm(form);
        } else {
            alert('Please sign in with Google')
        }
        
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
const errorInputs = document.querySelectorAll('[error-input]')

errorInputs.forEach(error => {
    error.addEventListener('input', () => {
        if (title.validity.valid) {
            titleError.textContent = '';
            titleError.className = 'error';
        } else {
            showError();
        }
    });
})
   
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


// Firebase:

// Authentication
const auth = firebaseApp.auth();

const logInButton = document.getElementById('loggedIn');
const logOutButton = document.getElementById('loggedOut')

// Sign In
async function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
}

// Sign Out
function signOut() {
    auth.signOut();
}

// Listen to Auth State changes:

auth.onAuthStateChanged(async (user) => {
    changeNav(user)
});


logInButton.onclick = signIn;
logOutButton.onclick = signOut;



// Database

const db = firebaseApp.firestore();

const bookCollection = db.collection('books')

const addBookToDatabase = (book) => {
    bookCollection.add(createStorageObject(book))
}

const removeBookFromDatabase = async (book) => {
    bookCollection
        .doc(await getBookIdFromStorage(book.title))
        .delete()
}

const toggleReadFromDatabase = async (book) => {
    if (book.read === 'Not Read') {
        bookCollection
        .doc(await getBookIdFromStorage(book.title))
        .update({read: 'Read'})
    } else if (book.read === 'Read') {
        bookCollection
        .doc(await getBookIdFromStorage(book.title))
        .update({read: 'Not Read'})
    }
}

const getBookIdFromStorage = async (title) => {
    const snapshot = await bookCollection
        .where('ownerId', '==', auth.currentUser.uid)
        .where('title', '==', title)
        .get()
    const id = snapshot.docs.map((doc) => doc.id)[0]
    return id
}

const createStorageObject = (book) => {
    return {
        ownerId: auth.currentUser.uid,
        title: book.title,
        author: book.author,
        pageCount: book.pageCount,
        read: book.read
    }
}