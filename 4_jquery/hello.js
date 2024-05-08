const books = [
  { 
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald", 
    pages: 180, 
    year: 1925, 
    isbn: "9780743273565" 
  },
  { 
    title: "To Kill a Mockingbird", 
    author: "Harper Lee", 
    pages: 281, 
    year: 1960, 
    isbn: "9780061120084" 
  },
  { 
    title: "1984", 
    author: "George Orwell", 
    pages: 328, 
    year: 1949, 
    isbn: "9780451524935" 
  }
];


// Write a function here
function getBookStatistics(booksArray) {
    const totalBooks = booksArray.length;
    
    let totalPageCount = 0;
    const authorsSet = new Set();
    let oldestBook = booksArray[0];
    let newestBook = booksArray[0];
    
    for (let book of booksArray) {
        totalPageCount += book.pages;
        authorsSet.add(book.author);
        if (book.year < oldestBook.year) {
            oldestBook = book;
        }
        if (book.year > newestBook.year) {
            newestBook = book;
        }
    }

    return {
        totalBooks: totalBooks,
        totalPages: totalPageCount,
        authors: Array.from(authorsSet),
        oldestBook: oldestBook,
        newestBook: newestBook
    };
    
}

function say() {
    alert(JSON.stringify(getBookStatistics(books)));
}