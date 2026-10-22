import * as collectionController from "./collection.controller.js";
import { Router } from "express";

export const collectionRouter = Router();

// => POST "/collection/books"
collectionRouter.post("/books", collectionController.createBooksCollection);

// => POST "/collection/authors"
collectionRouter.post("/authors", collectionController.createAuthorsCollection);

// => POST "/collection/logs/capped"
collectionRouter.post(
  "/logs/capped",
  collectionController.createLogsCollection,
);
