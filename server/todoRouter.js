const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs");

const bundledDbPath = path.join(__dirname, "database.sqlite");
const runtimeDbPath = process.env.VERCEL
  ? path.join("/tmp", "database.sqlite")
  : bundledDbPath;

if (process.env.VERCEL && !fs.existsSync(runtimeDbPath)) {
  fs.copyFileSync(bundledDbPath, runtimeDbPath);
}

const db = new sqlite3.Database(runtimeDbPath);

//Retrieve all to-do items.
router.get("/", (req, res, next) => {
  const sql = "SELECT * FROM Todo";
  db.all(sql, (err, todos) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ todo: todos });
    }
  });
});

//upcomming feature
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Todo WHERE id = $id";
  const values = { $id: id };
  db.get(sql, values, (err, todoItem) => {
    if (err) {
      next(err);
    } else if (todoItem) {
      res.status(200).json({ todo: todoItem });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
});

//Add new to-do item
router.post("/", (req, res, next) => {
  const newtodo = req.body.todo;
  if (!newtodo) {
    res.status(400).json({ error: "task is required" });
  }
  const task = newtodo.task,
    description = newtodo.description,
    duedate = newtodo.duedate,
    status = newtodo.status;
  if (!task) {
    res.status(400).json({ error: "task is required" });
  }
  const sql =
    "INSERT INTO Todo (task, description, duedate, status)" +
    "VALUES ($task, $description, $duedate, $status)";

  const values = {
    $task: task,
    $description: description,
    $duedate: duedate,
    $status: status,
  };

  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Todo where id = ${this.lastID}`, (err, todo) => {
        res.status(201).json({ todo: todo });
      });
    }
  });
});

//update to-do item
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newtodo = req.body.todo;
  const task = newtodo.task,
    description = newtodo.description,
    duedate = newtodo.duedate,
    status = newtodo.status;
  if (!task) {
    res.status(400);
  }

  const sql =
    "UPDATE Todo SET " +
    "task = $task, description = $description, duedate = $duedate, status = $status " +
    "WHERE id = $id;";

  const values = {
    $task: task,
    $description: description,
    $duedate: duedate,
    $status: status,
    $id: id,
  };
  db.run(sql, values, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Todo where id = ${id}`, (err, todo) => {
        res.status(200).json({ todo: todo });
      });
    }
  });
});

//delete to-do item
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const sql = "DELETE FROM Todo WHERE id = $id";
  const value = { $id: id };
  db.run(sql, value, (err) => {
    if (err) {
      next(err);
    } else {
      res.status(204).send("success");
    }
  });
});

module.exports = router;
