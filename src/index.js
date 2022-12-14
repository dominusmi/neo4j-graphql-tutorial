import { typeDefs } from './graphql-schema.js'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import express from 'express'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { resolvers } from './resolves/definition.js'
import { GRAPHQL_HOST, GRAPHQL_PORT, GRAPHQL_PATH, NEO4J_PASSWORD, NEO4J_USER, NEO4J_URI } from "./env.js"
import { ogm, driver } from './common.js' 


const app = express()


/*
 * Create an executable GraphQL schema object from GraphQL type definitions
 * including autogenerated queries and mutations.
 * Read more in the docs:
 * https://neo4j.com/docs/graphql-manual/current/
 */
const neoSchema = new Neo4jGraphQL({
    typeDefs,
    resolvers,
    driver,
})


Promise.all([neoSchema.getSchema(), ogm.init()]).then(([schema]) => {

  /*
  * Create a new ApolloServer instance, serving the GraphQL schema
  * created using makeAugmentedSchema above and injecting the Neo4j driver
  * instance into the context object, so it is available in the
  * generated resolvers to connect to the database.
  */
  const server = new ApolloServer({
      schema: schema,
      context: ({ req }) => ({ req, driver }),
      introspection: true,
      playground: true,
      plugins: [
          ApolloServerPluginLandingPageLocalDefault()
      ]
  })

  server.start().then(() => {
      server.applyMiddleware({ app, path: GRAPHQL_PATH });
      app.listen({ host: GRAPHQL_HOST, port: GRAPHQL_PORT, path: GRAPHQL_PATH }, async () => {
          let attempt = 0;
          while(attempt < 3){
            try {
              console.log("Asserting constraints and indexes")
              await neoSchema.assertIndexesAndConstraints({ options: { create: true }});
              break;
            }catch(e){
              // It is most likely is an error due to the database not being up and running yet. 
              // We still print the exception string to make sure it's not something more
              attempt += 1;
              console.log(`${e}`);
              console.log(`Caught error while checking database constraints, retrying in 30 seconds [${attempt}/3]`);
              await new Promise(r => setTimeout(r, 30000));
            }
          }
          console.log(`GraphQL server ready at http://${GRAPHQL_HOST}:${GRAPHQL_PORT}${GRAPHQL_PATH}`)
        })
  });
});
