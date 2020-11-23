import { gql } from "apollo-server";
import createModule from "lib/createModule";
import db from "prisma";

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

export const BookModule = createModule("Book", {
  resolvers: {
    Query: {
      books: async () => {
        return await db.book.findMany({
          orderBy: {
            id: "asc",
          },
        });
      },
    },
  },
  schema: definition,
  async nodeResolver(id) {
    return db.book.findOne({
      where: {
        id,
      },
    });
  },
});
