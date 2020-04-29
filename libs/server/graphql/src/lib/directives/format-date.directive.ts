import { SchemaDirectiveVisitor } from 'apollo-server-koa';
import {
  defaultFieldResolver,
  GraphQLString,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLArgument,
} from 'graphql';
import formatDate from 'date-fns/format';

type TField = GraphQLField<any, any>;
interface TVisitedFieldDetails {
  objectType: GraphQLObjectType | GraphQLInterfaceType;
}

export class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: TField, details: TVisitedFieldDetails) {
    const { resolve = defaultFieldResolver } = field;
    const { format: defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    } as GraphQLArgument);

    field.resolve = async function (root, { format, ...rest }, ctx, info) {
      const date = await resolve.call(this, root, rest, ctx, info);
      return formatDate(date, format || defaultFormat);
    };
  }
}
