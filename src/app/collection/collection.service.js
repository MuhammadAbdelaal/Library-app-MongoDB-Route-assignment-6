import * as collectionRepository from "./collection.repository.js";

// create 'books' collection
export async function createBooksCollection() {
  const { collectionName } = await collectionRepository.createBooksCollection();
  return collectionName;
}

// create 'authors' collection
export async function createAuthorsCollection(author) {
  return await collectionRepository.createAuthorsCollection(author);
}

// create 'logs' collection
export async function createLogsCollection() {
  const { collectionName } = await collectionRepository.createLogsCollection();
  return collectionName;
}

// create index on the books collection for the title field.
export async function createIndexOnBooksCollection() {
  return await collectionRepository.createIndexOnBooksCollection();
}
