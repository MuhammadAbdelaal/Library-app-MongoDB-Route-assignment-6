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

// find books where the genre (include or exclude)
export async function findBooksByGenre(operator, genres) {
  return await db
    .collection("books")
    .find({ genres: { [operator]: genres } }, { projection: { _id: 0 } })
    .toArray();
}

// find all books paginated by year
export async function findBooksPaginatedByYear(sort, skip, limit) {
  return await db
    .collection("books")
    .find({}, { projection: { _id: 0 } })
    .sort({ year: sort })
    .skip(skip)
    .limit(limit)
    .toArray();
}

// find books where the year field stored as an integer.
export async function findBooksByIntegerYear() {
  return await db
    .collection("books")
    .find({ year: { $type: "int" } })
    .toArray();
}

// delete all books published before a year
export async function deleteBooksBeforeYear(year) {
  return await db.collection("books").deleteMany({ year: { $lt: year } });
}

// aggregation, filter books published after 2000 sort decs
export async function aggregateBooks1() {
  return await db
    .collection("books")
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();
}

// aggregate2 for books, after 2000, show selected fields
export async function aggregateBooks2() {
  return await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();
}

// break an array of genres into separate documents
export async function aggregateBooks3() {
  return await db
    .collection("books")
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();
}

// join the books collection with the logs collection
export async function aggregateBooks4() {
  return await db
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      { $match: { book_details: { $ne: [] } } },
      {
        $project: {
          _id: 0,
          action: 1,
          "book_details.title": 1,
          "book_details.author": 1,
          "book_details.year": 1,
        },
      },
    ])
    .toArray();
}
