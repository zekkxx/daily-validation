require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

//connect to MongodDB
const MONGODB_URI = process.env.MONGODB_URI
  || "mongodb://localhost/daily_validation_db";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());

require('./config/passport-init')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
