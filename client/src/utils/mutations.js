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
