const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");
const { getAllTodos, getTodoById, deleteTodoById } = require("../model/todo");

//Retrieve all to-do items.
router.get("/", async (req, res, next) => {
  const sql = "SELECT * FROM Todo";
  db.all(sql, (err, todos) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ todo: todos });
    }
  });
});

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
      res.status(404);
    }
  });
});

//Add new to-do item
router.post("/", (req, res, next) => {
  const newtodo = req.body.todo;
  const task = newtodo.task,
    description = newtodo.description,
    duedate = newtodo.duedate,
    status = newtodo.status;
  if (!task) {
    res.status(400);
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
