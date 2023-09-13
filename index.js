const express = require("express");
const routes = require("./routes");
const connectDB = require("./db");
const urlmodel = require("./models/shortener.model");

const app = express();

const PORT = 3007;

connectDB();

app.use("/", routes);

app.listen(PORT, () =>
  console.log(`Server started, listening at port ${PORT}`)
);
