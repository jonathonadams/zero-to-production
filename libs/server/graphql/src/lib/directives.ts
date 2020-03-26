import { SchemaDirectiveVisitor } from 'apollo-server-koa';
import {
  defaultFieldResolver,
  GraphQLString,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
} from 'graphql';
import formatDate from 'date-fns/format';

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

export class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: TField, details: TVisitedFieldDetails) {
    const { resolve = defaultFieldResolver } = field;
    const { format: defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    } as any);

    field.resolve = async function (root, { format, ...rest }, ctx, info) {
      const date = await resolve.call(this, root, rest, ctx, info);
      return formatDate(date, format || defaultFormat);
    };
  }
}
