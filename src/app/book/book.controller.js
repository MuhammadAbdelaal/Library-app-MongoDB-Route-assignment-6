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

// find books by genre (include or exclude)
export async function findBooksByGenre(req, res, next) {
  const { operator } = req.query;
  const genres = (req.query.genres || "")
    .split(",")
    .map((genre) => genre.trim());

  // if the operator is not valid, return an error
  if (operator !== "$in" && operator !== "$nin") {
    const error = new Error(
      "Please provide a valid operator: ($in) or ($nin)!",
    );
    error.statusCode = 400;
    return next(error);
  }

  // if no genres are provided, return an error
  if (!genres[0]) {
    const error = new Error("Please provide genres!");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const books = await bookService.findBooksByGenre(operator, genres);
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
}
// find books paginated by year
export async function findBooksPaginatedByYear(req, res, next) {
  const sortValue = req.query.sort || "desc"; // default to descending order
  // check if the inserted sort value is not valid
  if (sortValue !== "asc" && sortValue !== "desc") {
    const error = new Error(
      "Please provide a valid sort value (asc) or (desc)!",
    );
    error.statusCode = 400;
    return next(error);
  }
  // convert sort value to a number (-1 for desc, 1 for asc)
  const sort = sortValue === "asc" ? 1 : -1;

  const { skip: skipValue, limit: limitValue } = req.query;

  // convert skip and limit values to numbers (default to 0 and 10)
  const skip = Number(skipValue || 0),
    limit = Number(limitValue || 10);

  // if the number is not integer or not (0-100)
  if (
    !Number.isInteger(skip) ||
    !Number.isInteger(limit) ||
    skip < 0 ||
    limit < 1 ||
    limit > 100
  ) {
    const error = new Error(
      "Please provide valid values for skip (0+) and limit (1-100).",
    );
    error.statusCode = 400;
    return next(error);
  }

  // if all values are valid, call the service function
  try {
    const result = await bookService.findBooksPaginatedByYear(
      sort,
      skip,
      limit,
    );
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// find books where the year field stored as an integer.
export async function findBooksByIntegerYear(req, res, next) {
  try {
    const result = await bookService.findBooksByIntegerYear();
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// delete all books published before a year
export async function deleteBooksBeforeYear(req, res, next) {
  const year = Number(req.query.year);
  // if no year is provided, return an error
  if (!year) {
    const error = new Error("Please provide a year!");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const result = await bookService.deleteBooksBeforeYear(year);
    return res.status(200).json({
      message: "Books deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// aggregate books 1
export async function aggregateBooks1(req, res, next) {
  try {
    const result = await bookService.aggregateBooks1();
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// aggregate books 2
export async function aggregateBooks2(req, res, next) {
  try {
    const result = await bookService.aggregateBooks2();
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// aggregate books 3
export async function aggregateBooks3(req, res, next) {
  try {
    const result = await bookService.aggregateBooks3();
    return res.status(200).json({
      message: "Books found successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// aggregate books 4
export async function aggregateBooks4(req, res, next) {
  try {
    const result = await bookService.aggregateBooks4();
    return res.status(200).json({
      message: "Books and their logs are as below:",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
