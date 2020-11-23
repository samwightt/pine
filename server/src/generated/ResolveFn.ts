import { GraphQLResolveInfo } from "graphql";

export type ResolveFn<TResult, TParent, TContext, TArgs> =
  | ((
      parent: TParent,
      args: TArgs,
      context: TContext,
      info: GraphQLResolveInfo
    ) => TResult)
  | [
      "connectionArray",
      (
        parent: TParent,
        args: TArgs,
        context: TContext,
        info: GraphQLResolveInfo
      ) => TResult
    ];
