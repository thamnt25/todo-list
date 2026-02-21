const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const path = require("path");

const router = require("./todoRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/todos", router);

if (process.env.NODE_ENV !== "production") {
  app.use(errorhandler());
}

// Serve built frontend only when running as a traditional Node server.
if (!process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*splat", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

module.exports = app;
