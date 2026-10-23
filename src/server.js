import express from "express";
import { collectionRouter } from "./app/collection/collection.route.js";
import { bookRouter } from "./app/book/book.route.js";
import { logRouter } from "./app/log/log.route.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // parse request body

app.use("/collection", collectionRouter); // collection router
app.use("/books", bookRouter); // book router
app.use("/logs", logRouter); // log router

// global error middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
    success: false,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
