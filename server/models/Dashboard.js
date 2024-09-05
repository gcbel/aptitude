/* DEPENDENCIES */
const { Schema, model } = require("mongoose");

/* DASHBOARD SCHEMA */
const dashboardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  goals: {
    type: Array,
    default: [],
  },
  todos: {
    type: Array,
    required: true,
    default: [],
  },
  stocks: {
    type: Array,
    default: [],
  },
  weather: {
    type: Number,
  },
  theme: {
    type: Number,
    default: 0,
  },
});

const Dashboard = model("Dashboard", dashboardSchema);

/* EXPORT */
module.exports = Dashboard;
