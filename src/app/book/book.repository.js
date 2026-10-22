import { db } from "../../common/db/connection.js";

// Insert one document into the books collection.
export async function insertOneDocumentIntoBooks(book) {
  return await db.collection("books").insertOne({ ...book });
}
