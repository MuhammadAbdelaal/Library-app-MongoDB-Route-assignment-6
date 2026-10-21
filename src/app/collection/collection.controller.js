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
