import * as collectionRepository from "./collection.repository.js";

// create 'books' collection
export async function createBooksCollection() {
  const { collectionName } = await collectionRepository.createBooksCollection();
  return collectionName;
}

// create 'authors' collection
export async function createAuthorsCollection(name, nationality) {
  return await collectionRepository.createAuthorsCollection(name, nationality);
}
