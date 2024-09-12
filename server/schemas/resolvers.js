/* DEPENDENCIES */
const { User, Dashboard, Todo } = require("../models");
const { GraphQLScalarType, Kind } = require("graphql");
const jwt = require("jsonwebtoken");

/* VARIABLES */
const expiration = "6h";

/* DATE SCALAR */
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  serialize(value) {
    // Convert outgoing Date to ISO string for the client
    return value.toISOString();
  },
  parseValue(value) {
    // Convert incoming ISO string to Date
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // Convert hard-coded AST string to Date
      return new Date(ast.value);
    }
    return null; // Invalid hard-coded value (not an ISO string)
  },
});

/* RESOLVERS */
const resolvers = {
  Date: dateScalar,
  Query: {
    user: async (_, { id }) => User.findById(id),
    users: async () => User.find(),
    currentUser: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return User.findById(user.id);
    },
    userDashboards: async (_, { username }) => {
      try {
        // Find user
        const currentUser = await User.findOne({ username: username });
        if (!currentUser) throw new Error("User not found");

        // Find user's dashboards
        const dashboards = await Dashboard.find({
          author: currentUser.username,
        });
        return dashboards;
      } catch (error) {
        console.error("Error fetching dashboards:", error);
        throw new Error("Error fetching dashboards");
      }
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findWithPassword({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: expiration,
        }
      );
      return { token, user };
    },
    signUp: async (_, { name, email, username, password }) => {
      // Check if username is unique
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new Error("That username is not available");
      }

      // Check if email is unique
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new Error("That email is already associated with an account");
      }

      // If username is unique, create user
      const user = await User.create({ name, email, username, password });
      if (!user) {
        throw new Error("Something went wrong!");
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          username: user.username,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: expiration,
        }
      );
      return { token, user };
    },
    updateUser: async (_, { id, username, password }) => {
      const updates = {};
      if (username) updates.username = username;
      if (password) updates.password = password;
      return User.findByIdAndUpdate(id, updates, { new: true }).select(
        "-password"
      );
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return true;
    },
    changeTheme: async (_, { id, theme }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }

        db.theme = theme;
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating theme:", error);
        return false;
      }
    },
    changeDBName: async (_, { id, name }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }

        db.name = name;
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating dashboard name:", error);
        return false;
      }
    },
    addDB: async (_, { author, name }) => {
      try {
        const db = new Dashboard({
          author,
          name,
          goals: [],
          todos: [],
          lists: [],
        });
        await db.save();
        return true;
      } catch (error) {
        console.error("Error adding new dashboard:", error);
        return false;
      }
    },
    deleteDB: async (_, { id }) => {
      try {
        const db = await Dashboard.findByIdAndDelete(id);
        if (!db) {
          throw new Error("Dashboard not found!");
        }
        return true;
      } catch (error) {
        console.error("Error deleting dashboard:", error);
        return false;
      }
    },
    changeTodoName: async (_, { id, index, name }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.todos[index].title = name;
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating todo list name:", error);
        return false;
      }
    },
    addTodoList: async (_, { id, name }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.todos.push({ title: name });
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating todo list name:", error);
        return false;
      }
    },
    deleteTodoList: async (_, { id, index }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.todos.splice(index, 1);
        await db.save();
        return true;
      } catch (error) {
        console.error("Error deleting todo list:", error);
        return false;
      }
    },
    changeListName: async (_, { id, index, name }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.lists[index].name = name;
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating list name:", error);
        return false;
      }
    },
    addList: async (_, { id, name }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.lists.push({ name: name });
        await db.save();
        return true;
      } catch (error) {
        console.error("Error updating todo list name:", error);
        return false;
      }
    },
    deleteList: async (_, { id, index }) => {
      try {
        const db = await Dashboard.findById(id);
        if (!db) {
          throw new Error("Couldn't find the dashboard!");
        }
        db.lists.splice(index, 1);
        await db.save();
        return true;
      } catch (error) {
        console.error("Error deleting list:", error);
        return false;
      }
    },
    // addTodoItem: async (_, { title, userId }) => {
    //   const newTodo = new Todo({
    //     title,
    //     userId,
    //     items: [],
    //   });
    //   return await newTodo.save();
    // },
    // updateTodoItem: async (_, { todoId, itemId, completed }) => {
    //   const todo = await Todo.findById(todoId);
    //   const item = todo.items.id(itemId);
    //   if (item) {
    //     item.completed = completed;
    //     await todo.save();
    //   }
    //   return todo;
    // },
    // removeTodoItem: async (_, { todoId, itemId }) => {
    //   const todo = await Todo.findById(todoId);
    //   todo.items.id(itemId).remove();
    //   await todo.save();
    //   return todo;
    // },
  },
};

/* EXPORTS */
module.exports = resolvers;
