import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";

import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";
import { promises as fs } from "fs";
import { join } from "path";

import schema from "./schema";

const server = new ApolloServer({ schema });

async function schemaGen() {
  const { data }: any = await server.executeOperation({
    query: getIntrospectionQuery(),
  });

  const schema = buildClientSchema(data);
  await fs.writeFile(
    join(__dirname, "../../schema.graphql"),
    printSchema(schema)
  );
}

schemaGen();
