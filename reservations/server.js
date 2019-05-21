const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Reservation @key(fields: "id") {
    id: ID!
    userId: ID!
    reservationDate: String!
    status: String
    authorId: ID!
  }

  type Query {
    reservations: [Reservation]!
    reservation(id: ID!): Reservation
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    reservations: [Reservation]
  }
`;

const mockReservation = () => {
  return {
    id: 1,
    userId: 1,
    reservationDate: 'today',
    status: 'good',
  };
};
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    reservations: () => [mockReservation(), mockReservation()],
    reservation: () => [mockReservation()],
  },
  User: {
    reservations: () => [mockReservation()],
  },
  Reservation: {
    // userObj: () => ({ __typename: 'User', id: '1' }),
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

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
