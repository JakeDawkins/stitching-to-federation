const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const serviceList = [
  { name: 'StitchedReservations', url: 'http://localhost:4001' },
  { name: 'StitchedUsers', url: 'http://localhost:4002' },
  // { name: "inventory", url: "http://localhost:4003" },
  // { name: "products", url: "http://localhost:4002" },
  // { name: "accounts", url: "http://localhost:4001" },
];

const gateway = new ApolloGateway({
  serviceList,
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
  });

  server.listen(8080).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
