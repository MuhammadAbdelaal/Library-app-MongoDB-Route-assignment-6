import * as bookRepository from "./book.repository.js";

// insert one document into books collection
export async function insertOneDocumentIntoBooks(book) {
  return await bookRepository.insertOneDocumentIntoBooks(book);
}
