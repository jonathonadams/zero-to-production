import { GraphQLField, GraphQLObjectType, GraphQLFieldResolver } from 'graphql';

export enum AuthDirectiveName {
  authenticated = 'authenticated',
  activeUser = 'activeUser',
}

export enum DirectiveWrapped {
  auth = '_authFieldWrapped',
  authUser = '_authUserFieldWrapped',
}

export type TAuthResolver = (
  next: GraphQLFieldResolver<any, any, any>
) => GraphQLFieldResolver<any, any, any>;

export function checkAppliedDirectives(
  field: GraphQLField<any, any> | GraphQLObjectType,
  directiveNames: string[]
) {
  if (
    field.astNode &&
    field.astNode.directives &&
    field.astNode.directives.length !== 0
  ) {
    for (const directive of field.astNode.directives) {
      if (directiveNames.includes(directive.name.value)) {
        return true;
      }
    }
  }

  return false;
}
