/* DEPENDENCIES */
const db = require("../config/connection.js");
const { User } = require("../models");
const cleanDB = require("../config/cleanDB.js");
const users = require("./user.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await User.create(users);

    console.log("Database seeded.");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
