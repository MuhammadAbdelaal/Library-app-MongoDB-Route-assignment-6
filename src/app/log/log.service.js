import * as logRepository from "./log.repository.js";
import { getBookById } from "../book/book.repository.js";

// insert one document into the logs collection
export async function insertOneLog(log) {
  // check if the book exists before inserting the log
  const bookExists = await getBookById(log.book_id);
  if (!bookExists) {
    throw new Error("Book does not exist");
  }
  return await logRepository.insertOneLog(log);
}
