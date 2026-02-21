const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS `Todo` ( " +
     "`id` INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "`task` NVARCHAR(200) NOT NULL, " +
      "`description` TEXT," +
      "`duedate` TEXT , " +
      "`status` INTEGER )"
  );

//    db.run(
//     "DROP TABLE Todo"
//   );

  //status: 1, 0 => 1-> completed, 0 => inprogress
});
