import { db } from "../../common/db/connection.js";

// insert one document into the logs collection
export async function insertOneLog(log) {
  return await db.collection("logs").insertOne({ ...log });
}
