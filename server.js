const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/freebiesdb";
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://heroku_dh8zm9nj:q1a8nrj5qm6iri3i8eal1bvlg5@ds151086.mlab.com:51086/heroku_dh8zm9nj";

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
