const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    address: String
  }

  type Query {
    user(id: ID!): User
  }
`;

const mockUser = () => {
  return {
    id: 1,
    firstName: 'Jake',
    lastName: 'Dawkins',
    address: 'everywhere',
  };
};
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: () => mockUser(),
  },
  User: {
    __resolveObject(object) {
      console.log(object);
      return mockUser();
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
