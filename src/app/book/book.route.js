import * as bookController from "./book.controller.js";
import { Router } from "express";

export const bookRouter = Router();

// => POST "/books"
bookRouter.post("/", bookController.insertOneDocumentIntoBooks);

// => POST "/books/batch"
bookRouter.post("/batch", bookController.insertMultipleDocumentsIntoBooks);
