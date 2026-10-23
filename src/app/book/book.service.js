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
