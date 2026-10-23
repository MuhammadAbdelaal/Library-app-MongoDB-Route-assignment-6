import { db } from "../../common/db/connection.js";

// Insert one document into the books collection.
export async function insertOneDocumentIntoBooks(book) {
  return await db.collection("books").insertOne({ ...book });
}

// insert multiple documents into the books collection
export async function insertMultipleIntoBooks(books) {
  return await db.collection("books").insertMany([...books]);
}
