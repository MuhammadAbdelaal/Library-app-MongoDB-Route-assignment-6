import { db } from "../../common/db/connection.js";

// Create an explicit collection named “books”
//  with a validation rule to ensure that each
// document has a non-empty “title” field.
export async function createBooksCollection() {
  return await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title is required field",
          },
        },
      },
    },
  });
}

// create implicit authors collection
export async function createAuthorsCollection(author) {
  return await db.collection("authors").insertOne({
    name: author.name,
    nationality: author.nationality,
  });
}

// create capped collection named “logs” with a size limit of 1MB.
export async function createLogsCollection() {
  return await db.createCollection("logs", {
    capped: true,
    size: 1048576,
  });
}
