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

const addBook = function(book) {
    myLibrary.push(book)
}

const displayBooks = function() {
    for (i = 0; i < myLibrary.length; i++) {
        return myLibrary[i]
    }
}