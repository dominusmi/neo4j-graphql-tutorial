import neo4j from "neo4j-driver";
import { NEO4J_PASSWORD, NEO4J_USER, NEO4J_URI } from "./env.js"
import { typeDefs } from './graphql-schema.js'
import pkg from '@neo4j/graphql-ogm';
const { OGM } = pkg;



/*
 * Create a Neo4j driver instance to connect to the database.
 */
export const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(
        NEO4J_USER,
        NEO4J_PASSWORD
    )
);


export const ogm = new OGM({ typeDefs, driver });
export const PASSPHRASE = "insecure-passphrase-bip-bop";


