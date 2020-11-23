import { gql } from "apollo-server";
import createModule from "../utils/createModule";

const definition = gql`
  type Book implements Node {
    id: ID!
    title: String
    author: String
  }

  extend type Query {
    books: [Book]
  }
`;

const books = [
  {
    id: "1",
    title: "The Awakening",
    author: "KAte Chopin",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const module = createModule("Book", {
  resolvers: {
    Query: {
      books: () => {
        return books;
      },
    },
  },
  schema: definition,
  nodeResolver(id) {
    return books.find((x) => x.id === id);
  },
});

export default module;
