const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='Todo'",
  (error, table) => {
    if (error) {
      throw new Error(error);
    }

    if (table) {
      db.serialize(() => {
        db.all(
          "SELECT group_concat(name, '|') AS cols FROM pragma_table_info('Todo');",
          (err, row) => {
            console.log(row);
          },
        );
        // db.run(
        //   "INSERT INTO Todo (task, description, duedate, status) VALUES ('Go office', 'Review final exam', '2026-02-23', 0)",
        // );
        // db.run(
        //   "INSERT INTO Todo (task, description, duedate, status) VALUES ('Family day playdate', 'with Heslay family', '2026-02-23', 0)",
        // );
      });
    }
  },
);
