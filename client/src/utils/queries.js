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

export const QUERY_USER_PROFILE = gql`
  query userDashboards($username: String!) {
    userDashboards(username: $username) {
      _id
      name
      goals {
        _id
        title
        description
        completed
        milestones {
          _id
          name
          completed
        }
      }
      lists {
        _id
        name
        items {
          _id
          name
          completed
        }
      }
      todos {
        _id
        title
        items {
          _id
          name
          completed
        }
        completed
      }
      habits {
        _id
        icon
        name
        frequency
        completedDates
      }
      stocks {
        _id
        name
      }
      weather
      theme
    }
  }
`;
