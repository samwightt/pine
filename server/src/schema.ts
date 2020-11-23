import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers, Node } from "types/graphql";
import { merge } from "lodash";

import * as UnformattedModules from "./modules";
const Modules = Object.values(UnformattedModules);

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type Query {
    node(id: ID!): Node
  }
`;

const nodeResolver: Resolvers = {
  Query: {
    node: (parent, args, context, info) => {
      for (let i = 0; i < Modules.length; i++) {
        if (Modules[i].isID(args.id)) {
          const id = Modules[i].extractID(args.id);
          if (id) {
            const result = Modules[i].nodeResolver(id) as Node;
            const newResult = {
              ...result,
              id: Modules[i].generateId(result),
            };
            return newResult;
          }
        }
      }

      return null;
    },
  },
  Node: {
    __resolveType: (parent) => {
      for (let i = 0; i < Modules.length; i++) {
        if (Modules[i].isID(parent.id)) return Modules[i].name;
      }

      return null;
    },
  },
};

const otherResolvers = Modules.map((item) => item.resolvers);
const schemas = Modules.map((item) => item.schema);

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, ...schemas],
  resolvers: merge({}, nodeResolver, ...otherResolvers),
});

export default schema;
