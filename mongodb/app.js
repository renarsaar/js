// Import packages
const express = require("express");
const mongoose = require("mongoose");

// Import routes
const postRoute = require("./routes/posts");

// Execute express
const app = express();

// Bodyparser
app.use(express.json());

// Mongodb key
const db = require("./config/keys").mongoURI;

// Connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB is connected.");
  })
  .catch(err => {
    console.log(err);
  });

// Routes
app.use("/posts", postRoute);
// Get, post, delete, patch
app.get("/", (req, res) => {
  res.send("Home");
});

// Listen to server
app.listen(3000);

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
