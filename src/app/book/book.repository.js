import { db } from "../../common/db/connection.js";
import { ObjectId } from "mongodb";

// Insert one document into the books collection.
export async function insertOneDocumentIntoBooks(book) {
  return await db.collection("books").insertOne({ ...book });
}

// insert multiple documents into the books collection
export async function insertMultipleIntoBooks(books) {
  return await db.collection("books").insertMany([...books]);
}

// get book by id
export async function getBookById(id) {
  return await db.collection("books").findOne({ _id: new ObjectId(id) });
}

// update book with a specific title
export async function updateBook(bookTitle, bookValues) {
  return await db
    .collection("books")
    .updateOne({ title: bookTitle }, { $set: { ...bookValues } });
}
