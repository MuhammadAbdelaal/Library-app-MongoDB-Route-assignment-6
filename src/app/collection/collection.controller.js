import * as collectionService from "./collection.service.js";

// create 'books' collection
export async function createBooksCollection(req, res, next) {
  try {
    const collectionName = await collectionService.createBooksCollection();
    return res.status(201).json({
      message: `Books collection created successfully`,
      success: true,
      data: collectionName,
    });
  } catch (error) {
    next(error);
  }
}

// create 'authors' collection
export async function createAuthorsCollection(req, res, next) {
  const { name, nationality } = req.body || {};
  try {
    const result = await collectionService.createAuthorsCollection({
      name,
      nationality,
    });
    return res.status(201).json({
      message: "Authors collection created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// create 'logs' collection
export async function createLogsCollection(req, res, next) {
  try {
    const collectionName = await collectionService.createLogsCollection();
    return res.status(201).json({
      message: "Collection created successfully",
      success: true,
      data: collectionName,
    });
  } catch (error) {
    next(error);
  }
}
