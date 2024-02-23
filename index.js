const express = require("express");
const cors = require("cors");
const _ = require("dotenv").config();

const connectToDatabase = require("./config/DBConnection");
const Routes = require("./routes/Routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(async (req, res, next) => {
  try {
    const client = await connectToDatabase();
    req.dbClient = client;

    next();
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: "err/Internal Server Error" });
  }
});
app.use("/api", Routes);
app.get("/", (req, res) => {
  return res.send("Hello, Nervespark!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}@http://localhost:${PORT}`);
});
