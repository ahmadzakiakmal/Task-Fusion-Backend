import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Project {
    id: ID!
    name: String!
    description: String
  }

  type Task {
    id: ID!
    name: String!
    description: String
    projectId: ID!
  }

  type Notification {
    status: String!
    error: String
  }

  type Query {
    getProjects: [Project]
    getTasks(projectId: ID!): [Task]
  }

  type Mutation {
    createProject(name: String!, description: String): Project
    createTask(projectId: ID!, name: String!, description: String): Task
    sendNotification(message: String!): Notification
  }
`);

export default schema;
