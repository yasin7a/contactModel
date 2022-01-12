const express = require("express");
const router = require("./route/router");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect("mongodb://localhost/contactmodel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);
app.listen(3000, () => {
  console.log("server is running on port 3000...");
});
