const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')


const route = require("./route");

const app = express();

app.use(cors());
app.use(express.json())

app.use("/apis", route);

app.get("/", (req, res) => {
  res.send("Hello Siri");
});

//app.listen(5000);

// Establishing the port
const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number
app.listen(PORT, console.log(`Server started on port ${PORT}`));
