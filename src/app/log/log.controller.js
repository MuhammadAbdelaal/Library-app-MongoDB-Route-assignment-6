import * as logService from "./log.service.js";

// insert one log
export async function insertOneLog(req, res, next) {
  const { book_id, action } = req.body || {};

  try {
    const result = await logService.insertOneLog({ book_id, action });
    return res.status(201).json({
      message: "Log inserted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
