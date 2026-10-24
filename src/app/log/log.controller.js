import * as logService from "./log.service.js";
import { ObjectId } from "mongodb";

// insert one log
export async function insertOneLog(req, res, next) {
  const { book_id, action } = req.body || {};

  if (!ObjectId.isValid(book_id) || !action) {
    const error = new Error(
      "Please provide a valid (book_id) and an (action) valeus",
    );
    error.statusCode = 400;
    return next(error);
  }

  try {
    const result = await logService.insertOneLog({
      book_id: new ObjectId(book_id),
      action,
    });
    return res.status(201).json({
      message: "Log inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
