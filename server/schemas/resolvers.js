/* DEPENDENCIES */
const { User } = require("../models");
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
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findWithPassword({ username });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: expiration,
        }
      );
      return { token, user };
    },
    signUp: async (_, { username, password }) => {
      // Check if username is unique
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("That username is not available");
      }

      // If username is unique, create user
      const user = await User.create({ username, password });
      if (!user) {
        throw new Error("Something went wrong!");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
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
  },
};

/* EXPORTS */
module.exports = resolvers;
