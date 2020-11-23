import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({ schema });

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
