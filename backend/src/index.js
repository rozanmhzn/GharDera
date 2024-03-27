require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

const userRoutes = require("../routes/user");

const propertyRoutes = require("../routes/property");

const port = process.env.PORT;

const dbURL = process.env.DB_URL;

app.use(express.json()); //middleware of Express

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
  })
);

//custom middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//DB connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
  console.log("Connected");
}

// app.get("/", (req, res, next) => {
//   res.send("home page..");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
