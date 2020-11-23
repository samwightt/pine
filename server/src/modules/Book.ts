import { gql } from "apollo-server";
import createModule from "lib/createModule";
import db from "prisma";

export const BookModule = createModule("Book", {
  schema: gql`
    type Book implements Node {
      id: ID!
      title: String
      author: String
    }

    extend type Query {
      books: [Book]
      book(id: ID!): Book
    }
  `,
  resolvers: {
    Query: {
      books: async () => {
        return await db.book.findMany({
          orderBy: {
            id: "asc",
          },
        });
      },
      book: async (parent, args) => {
        return await db.book.findOne({
          where: {
            id: args.id,
          },
        });
      },
    },
  },
  async nodeResolver(id) {
    return db.book.findOne({
      where: {
        id,
      },
    });
  },
});
