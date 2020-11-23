import { Resolvers, ResolversParentTypes, Scalars } from "types/graphql";
import { gql } from "apollo-server";

interface CreateUnitTypeInput<T extends keyof Resolvers> {
  resolvers: Resolvers;
  schema: ReturnType<typeof gql>;

  nodeResolver: (id: string) => ResolversParentTypes[T] | null | undefined;
  generateId?: (input: ResolversParentTypes[T]) => Scalars["ID"];
  isID?: (input: Scalars["ID"]) => boolean;
  extractID?: (input: Scalars["ID"]) => string;
}

interface ExtendedCreateModuleInput<T extends keyof Resolvers>
  extends CreateUnitTypeInput<T> {}

type InputType<T extends keyof Resolvers> =
  | CreateUnitTypeInput<T>
  | ExtendedCreateModuleInput<T>;

interface CreateModuleReturnType<T extends keyof Resolvers> {
  name: T;
  resolvers: Resolvers;
  schema: ReturnType<typeof gql>;

  generateId: (input: ResolversParentTypes[T]) => Scalars["ID"];
  isID: (input: Scalars["ID"]) => boolean;
  extractID: (input: Scalars["ID"]) => string | null;

  nodeResolver: (id: string) => ResolversParentTypes[T] | null | undefined;
}

const createModule = <T extends Exclude<keyof Resolvers, "Node" | "Query">>(
  name: T,
  input: InputType<T>
): CreateModuleReturnType<T> => {
  const {
    resolvers,
    nodeResolver,
    schema,
    generateId: gID,
    isID: II,
    extractID,
  } = input;
  const generateId =
    gID ||
    ((input) => {
      return `${name.toLowerCase()}:${input.id}`;
    });

  const isID =
    II ||
    ((input) => input.match(new RegExp(`${name.toLowerCase()}:(.+)`)) !== null);
  const toReturn = {
    name,
    resolvers: {
      ...resolvers,
      [name]: {
        ...resolvers[name],
        id: (parent: any) => {
          if (!isID(parent.id)) {
            return generateId(parent);
          } else return parent.id;
        },
      },
    },
    nodeResolver,
    schema,
    generateId,
    isID,
    extractID:
      extractID ||
      ((input) => {
        const match = input.match(new RegExp(`${name.toLowerCase()}:(.+)`));
        if (match) return match[1];
        else return null;
      }),
  };

  return toReturn;
};

export default createModule;
