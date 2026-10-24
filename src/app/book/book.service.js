import * as bookRepository from "./book.repository.js";

// insert one document into books collection
export async function insertOneDocumentIntoBooks(book) {
  return await bookRepository.insertOneDocumentIntoBooks(book);
}

// insert multiple documents into the books collection
export async function insertMultipleIntoBooks(books) {
  return await bookRepository.insertMultipleIntoBooks(books);
}

// update book with a specific title
export async function updateBook(bookTitle, bookValues) {
  return await bookRepository.updateBook(bookTitle, bookValues);
}

// find a book by title
export async function findBookByTitle(title) {
  const book = await bookRepository.findBookByTitle(title);
  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }
  return book;
}

// find all books published between two years
export async function findBooksBetween(year1, year2) {
  return await bookRepository.findBooksBetween(year1, year2);
}

// find books where the genre (include or exclude)
export async function findBooksByGenre(operator, genres) {
  return await bookRepository.findBooksByGenre(operator, genres);
}

// find all books paginated by year
export async function findBooksPaginatedByYear(sort, skip, limit) {
  return await bookRepository.findBooksPaginatedByYear(sort, skip, limit);
}

// find books where the year field stored as an integer.
export async function findBooksByIntegerYear() {
  return await bookRepository.findBooksByIntegerYear();
}

// delete all books published before a year
export async function deleteBooksBeforeYear(year) {
  return await bookRepository.deleteBooksBeforeYear(year);
}

// aggregation, filter books published after 2000 sort decs
export async function aggregateBooks1() {
  return await bookRepository.aggregateBooks1();
}

// aggregate 2 for books, after 2000, show selected fields
export async function aggregateBooks2() {
  return await bookRepository.aggregateBooks2();
}
