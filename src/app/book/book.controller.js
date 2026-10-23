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

// insert multiple documents into books
export async function insertMultipleDocumentsIntoBooks(req, res, next) {
  const books = req.body || {};
  try {
    const result = await bookService.insertMultipleIntoBooks(books);
    return res.status(201).json({
      message: "Book records inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// update book with a specific title
export async function updateBook(req, res, next) {
  const bookTitle = req.params.title;
  const { title, author, year, genres } = req.body || {};

  // filter out undefined values
  const bookValues = Object.fromEntries(
    Object.entries({ title, author, year, genres }).filter(
      ([key, value]) => value !== undefined,
    ),
  );

  // if no values are provided, return an error
  if (Object.keys(bookValues).length === 0) {
    const error = new Error("Please provide at least one value to update");
    error.statusCode = 400;
    return next(error);
  }

  // call the updateBook service function
  try {
    const result = await bookService.updateBook(bookTitle, bookValues);
    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
