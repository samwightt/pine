import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import {
  definition as BookDefinition,
  resolvers as BookResolvers,
} from "./types/Book";
import { merge } from "lodash";

const typeDefs = gql`
  type Query {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, BookDefinition],
  resolvers: merge(BookResolvers),
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }: any) => {
  console.log(`Server ready at ${url}`);
});
