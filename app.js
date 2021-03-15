const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// middlewares for CORS and json parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client/build"));
app.use(morgan("tiny"));

// Serve API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// // Serve static content
// app.use(express.static('public'));
// app.get('*', (req,res) => {
//     res.sendFile(path.resolve(__dirname, 'public','index.html'));
// })

// Forward invalid routes to the error handler below
app.use((req, res, next) => {
  const error = new Error("Page Not found");
  error.httpCode = 404;
  next(error);
});

// Handle all errors thrown
app.use((err, req, res, next) => {
  res
    .status(err.httpCode || 500)
    .json({ error: { msg: err.message || "Server error" } });
});

module.exports = app;
