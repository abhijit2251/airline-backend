const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')


const route = require("./route");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/apis", route);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000);
