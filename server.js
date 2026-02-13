const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser'); 
const router = require("./api/todoRouter");
const errorhandler = require("errorhandler");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/todos", router);
app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;
