import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allProfiles {
    users {
      _id
      name
      skills
    }
  }
`;
