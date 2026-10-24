import * as bookController from "./book.controller.js";
import { Router } from "express";

export const bookRouter = Router();

// => POST "/books"
bookRouter.post("/", bookController.insertOneDocumentIntoBooks);

// => POST "/books/batch"
bookRouter.post("/batch", bookController.insertMultipleDocumentsIntoBooks);

// => Patch "/books/:title"
bookRouter.patch("/:title", bookController.updateBook);

// => Get "/books/title/
bookRouter.get("/title", bookController.findBookByTitle);

// => Get "/books/year"
bookRouter.get("/year", bookController.findBooksBetween);

// => Get "/books/operator-genres"
bookRouter.get("/operator-genres", bookController.findBooksByGenre);

// => Get "/books/sort-skip-limit
bookRouter.get("/sort-skip-limit", bookController.findBooksPaginatedByYear);

// => Get "/books/year-integer"
bookRouter.get("/year-integer", bookController.findBooksByIntegerYear);

// => Delete "/books/before-year"
bookRouter.delete("/before-year", bookController.deleteBooksBeforeYear);

// => Get "/books/aggregate1"
bookRouter.get("/aggregate1", bookController.aggregateBooks1);

// => Get "/books/aggregate2"
bookRouter.get("/aggregate2", bookController.aggregateBooks2);

// => Get "/books/aggregate3"
bookRouter.get("/aggregate3", bookController.aggregateBooks3);
