import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();

export const typeDefs = fs
  .readFileSync(path.join(__dirname, 'src/schema.graphql'))
  .toString('utf-8')
