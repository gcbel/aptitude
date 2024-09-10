const typeDefs = `
    scalar Date

    type Query {
        user(id: ID!): User
        users: [User]
        currentUser: User
        userDashboards(username: String!): [Dashboard]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signUp(name: String!, email: String!, username: String!, password: String!): Auth
        updateUser(id: ID!, username: String, password: String): User
        deleteUser(id: ID!): Boolean
        changeTheme(id: ID!, theme: Int! ): Boolean
        changeDBName(id: ID!, name: String! ): Boolean
        addTodoItem(todoId: ID!, title: String!): Todo
        updateTodoItem(todoId: ID!, itemId: ID!, name: String!, completed: Boolean!): Todo
        deleteTodoItem(todoId: ID!, itemId: ID!): Todo
    }

    type Auth {
        token: String
        user: User
    }

    type User {
        _id: ID!
        name: String!
        username: String!
        password: String
    }

    type Dashboard {
        _id: ID!
        name: String!
        author: String!
        goals: [Goal]
        lists: [List]
        todos: [Todo]
        habits: [Habit]
        stocks: [Stock]
        weather: Int
        theme: Int
    }
    
    type Goal {
        _id: ID!
        title: String!
        description: String
        completed: Boolean
        milestones: [Item]
    }
    
    type List {
        _id: ID!
        name: String!
        items: [Item]
    }
    
    type Todo {
        _id: ID!
        title: String!
        items: [Item]
        completed: Boolean
    }
    
    type Habit {
        _id: ID!
        icon: Int!
        name: String!
        frequency: String # Should be 'daily', 'weekly', or 'monthly'
        completedDates: [Date]
    }
    
    type Item {
        _id: ID!
        name: String!
        completed: Boolean
    }
    
    type Stock {
        _id: ID!
        name: String!
    }
`;

module.exports = typeDefs;
