let myLibrary = [];

function Book(title, author, pageCount, read) {
    this.title = title
    this.author = author
    this.pageCount = pageCount
    this.read = read
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

