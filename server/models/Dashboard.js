const { Schema, model } = require("mongoose");

/* ITEM SCHEMA */
const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

/* TODO SCHEMA */
const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    items: [itemSchema],
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

/* LIST SCHEMA */
const listSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [itemSchema],
  },
  { _id: false }
);

/* GOAL SCHEMA */
const goalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    milestones: [itemSchema],
  },
  { _id: false }
);

/* HABIT SCHEMA */
const habitSchema = new Schema(
  {
    name: { type: String, required: true },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    completedDates: [{ type: Date }],
  },
  { _id: false }
);

/* DASHBOARD SCHEMA */
const dashboardSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  goals: [goalSchema],
  lists: [listSchema],
  todos: [todoSchema],
  habits: [habitSchema],
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
