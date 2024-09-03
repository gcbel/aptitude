import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
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
