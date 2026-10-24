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
