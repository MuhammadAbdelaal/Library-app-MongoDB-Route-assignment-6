import * as collectionService from "./collection.service.js";

// create 'books' collection
export async function createBooksCollection(req, res, next) {
  try {
    const collectionName = await collectionService.createBooksCollection();
    return res.status(201).json({
      message: `Collection (${collectionName}) created successfully`,
      success: true,
    });
  } catch (error) {
    next(error);
  }
}

// create 'authors' collection
export async function createAuthorsCollection(req, res, next) {
  const { name, nationality } = req.body || {};
  try {
    const result = await collectionService.createAuthorsCollection(
      name,
      nationality,
    );
    return res.status(201).json({ message: result, success: true });
  } catch (error) {
    next(error);
  }
}
