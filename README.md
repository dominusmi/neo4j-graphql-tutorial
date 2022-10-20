# Neo4j GraphQL Tutorial
This repository acts as a small Neo4j + GraphQL + Apollo Server tutorial, with all the boilerplate ready.

## Start the local environment
Nothing simpler! run 
``` 
docker-compose up
```
from the root directory, and wait about 30 seconds for the neo4j container to be ready. 
The docker is built with the `src` directory mounted, and with livereload with `nodemon`.

Once the compose is ready, navigate to `http://0.0.0.0:4001/graphql` to open the Apollo dashboard, and, if you're interested (not needed), `http://localhost:7474/browser/` to open the neo4j browser (leave username and password empty, and click connect).
