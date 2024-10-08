import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signUp(
      name: $name
      email: $email
      username: $username
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CHANGE_THEME = gql`
  mutation changeTheme($id: ID!, $theme: Int!) {
    changeTheme(id: $id, theme: $theme)
  }
`;

export const CHANGE_DB_NAME = gql`
  mutation changeDBName($id: ID!, $name: String!) {
    changeDBName(id: $id, name: $name)
  }
`;

export const ADD_DB = gql`
  mutation addDB($author: String!, $name: String!) {
    addDB(author: $author, name: $name)
  }
`;

export const DELETE_DB = gql`
  mutation deleteDB($id: ID!) {
    deleteDB(id: $id)
  }
`;

export const CHANGE_TODO_NAME = gql`
  mutation changeTodoName($id: ID!, $index: Int!, $name: String!) {
    changeTodoName(id: $id, index: $index, name: $name)
  }
`;

export const ADD_TODO_LIST = gql`
  mutation addTodoList($id: ID!, $name: String!) {
    addTodoList(id: $id, name: $name)
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation deleteTodoList($id: ID!, $index: Int!) {
    deleteTodoList(id: $id, index: $index)
  }
`;

export const CHANGE_LIST_NAME = gql`
  mutation changeListName($id: ID!, $index: Int!, $name: String!) {
    changeListName(id: $id, index: $index, name: $name)
  }
`;

export const ADD_LIST = gql`
  mutation addList($id: ID!, $name: String!) {
    addList(id: $id, name: $name)
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($id: ID!, $index: Int!) {
    deleteList(id: $id, index: $index)
  }
`;

// const UPDATE_TODO = gql`
//   mutation updateTodoItem($todoId: ID!, $itemId: ID!, $completed: Boolean!) {
//     updateTodoItem(todoId: $todoId, itemId: $itemId, completed: $completed) {
//       _id
//       title
//       items {
//         _id
//         name
//         completed
//       }
//     }
//   }
// `;
