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

// find a book by title
export async function findBookByTitle(req, res, next) {
  const { title } = req.query;
  // if no title is provided, return an error
  if (!title) {
    const error = new Error("Please provide a title!");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const result = await bookService.findBookByTitle(title);
    return res.status(200).json({
      message: "Book found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// find books between two years
export async function findBooksBetween(req, res, next) {
  const year1 = Number(req.query.from),
    year2 = Number(req.query.to);
  // if no from or to is provided, return an error
  if (
    !year1 ||
    !year2 ||
    !Number.isInteger(year1) ||
    !Number.isInteger(year2)
  ) {
    const error = new Error("Please provide a valid (from) and (to) values!");
    error.statusCode = 400;
    return next(error);
  }
  try {
    const result = await bookService.findBooksBetween(year1, year2);
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// find books by genre
export async function findBooksByGenre(req, res, next) {
  const genre = req.query.genre;
  // if no genre is provided, return an error
  if (!genre) {
    const error = new Error("Please provide a genre!");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const result = await bookService.findBooksByGenre(genre);
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
