/* DEPENDENCIES */
const db = require("../config/connection.js");
const { User, Dashboard } = require("../models");
const cleanDB = require("../config/cleanDB.js");
const users = require("./users.json");
const dashboards = require("./dashboards.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Dashboard", "dashboards");
    await User.create(users);
    await Dashboard.create(dashboards);

    console.log("Database seeded.");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
