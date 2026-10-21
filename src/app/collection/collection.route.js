import * as collectionController from "./collection.controller.js";
import { Router } from "express";

export const collectionRouter = Router();

// => POST "/books/collection"
collectionRouter.post("/books", collectionController.createBooksCollection);
