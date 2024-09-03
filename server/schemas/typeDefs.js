const typeDefs = `
    scalar Date

    type Query {
        user(id: ID!): User
        users: [User]
        currentUser: User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signUp(username: String!, password: String!): Auth
        updateUser(id: ID!, username: String, password: String): User
        deleteUser(id: ID!): Boolean
    }

    type Auth {
        token: String
        user: User
    }

    type User {
        _id: ID!
        username: String!
        password: String
    }
`;

module.exports = typeDefs;
