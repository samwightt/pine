import { gql } from "apollo-server";

export const definition = gql`
  type Book {
    title: String
    author: String
  }

  extend type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "KAte Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const resolvers = {
  Query: {
    books: () => books,
  },
};
