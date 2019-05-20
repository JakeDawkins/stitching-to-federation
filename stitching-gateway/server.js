const { ApolloServer, gql } = require('apollo-server');
const generateAndMergeSchemas = require('./remote-schemas');

generateAndMergeSchemas().then(schema => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ headers: req.headers }),
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
