import * as bookService from "./book.service.js";

// insert one document into books collection
export async function insertOneDocumentIntoBooks(req, res, next) {
  const { title, author, year, genres } = req.body || {};
  try {
    const result = await bookService.insertOneDocumentIntoBooks({
      title,
      author,
      year,
      genres,
    });
    return res.status(201).json({
      message: "Document inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
