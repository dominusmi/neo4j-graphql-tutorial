import dotenv from "dotenv";
dotenv.config();

export const GRAPHQL_PORT = process.env.GRAPHQL_SERVER_PORT || 4001;
export const GRAPHQL_PATH = process.env.GRAPHQL_SERVER_PATH || '/graphql';
export const GRAPHQL_HOST = process.env.GRAPHQL_SERVER_HOST || '0.0.0.0';

export const NEO4J_URI = process.env.NEO4J_URI;
export const NEO4J_USER = process.env.NEO4J_USER;
export const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;