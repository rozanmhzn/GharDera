const express = require("express");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("../routes/user");

const port = 3000;

app.use(express.json()); //middleware of Express

//custom middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//DB connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ghardera");
}

app.get("/", (req, res, next) => {
  res.send("home page..");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/user", userRoutes);
