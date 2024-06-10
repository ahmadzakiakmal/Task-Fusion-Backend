import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Notification {
    status: String!
    error: String
  }

  type ProfileResponse {
    id: Int!
    email: String!
    name: String!
  }

  type Query {
    myProfile: ProfileResponse
  }

  type Mutation {
    sendNotification(message: String!): Notification
    signUp(email: String!, name: String!, password: String!, password_confirm: String!): String!
    signIn(email: String!, password: String!): String!
  }
`);

export default schema;
