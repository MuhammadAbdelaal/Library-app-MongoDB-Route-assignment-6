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

// find a book by title
export async function findBookByTitle(title) {
  return await db.collection("books").findOne({ title });
}

// find all books published between two years
export async function findBooksBetween(year1, year2) {
  return await db
    .collection("books")
    .find({ year: { $gt: year1, $lt: year2 } }, { projection: { _id: false } })
    .toArray();
}

// find books where the genre includes a certain value
export async function findBooksByGenre(genre) {
  return await db
    .collection("books")
    .find({ genres: { $in: [genre] } }, { projection: { _id: 0 } })
    .toArray();
}

// find all books paginated by year
export async function findBooksPaginatedByYear(sort, skip, limit) {
  return await db
    .collection("books")
    .find()
    .sort({ year: sort })
    .skip(skip)
    .limit(limit)
    .toArray();
}
