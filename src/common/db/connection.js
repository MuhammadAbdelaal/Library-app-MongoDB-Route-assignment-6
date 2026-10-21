import { MongoClient } from "mongodb";

// create a connection client/pool
const client = new MongoClient("mongodb://127.0.0.1:27017/");

// specify the database
export const db = client.db("library_app");
