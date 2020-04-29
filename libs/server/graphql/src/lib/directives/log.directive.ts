import { SchemaDirectiveVisitor } from 'apollo-server-koa';
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
} from 'graphql';

type TField = GraphQLField<any, any>;
interface TVisitedFieldDetails {
  objectType: GraphQLObjectType | GraphQLInterfaceType;
}

// The log is not a useful directive, but an example of logging to external error
export class LogDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: TField, details: TVisitedFieldDetails) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (root, args, ctx, info) {
      console.log(`⚡️  ${details.objectType}.${field.name}`);
      return resolve.call(this, root, args, ctx, info);
    };
  }
}
