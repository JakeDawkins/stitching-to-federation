const { ApolloServer, gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: String
  }

  type Query {
    user(id: ID!): User
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  mocks: true
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
