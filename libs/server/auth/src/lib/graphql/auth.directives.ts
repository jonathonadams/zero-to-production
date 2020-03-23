import {
  GraphQLField,
  defaultFieldResolver,
  GraphQLObjectType,
  GraphQLInterfaceType
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { JWKSGuarConfig, GuardConfig } from '../auth.interface';
import { createGraphQLGuards } from './graphql.guards';

type TField = GraphQLField<any, any>;
interface TVisitedFieldDetails {
  objectType: GraphQLObjectType | GraphQLInterfaceType;
}

export function createAuthDirectives(
  config: JWKSGuarConfig | GuardConfig
): { [name: string]: typeof SchemaDirectiveVisitor } {
  //
  const { authenticate, authenticateUser } = createGraphQLGuards(config);

  class AuthenticateDirective extends SchemaDirectiveVisitor {
    visitObject(type: GraphQLObjectType) {
      this.ensureFieldsWrapped(type);
    }

    visitFieldDefinition(field: TField, details: TVisitedFieldDetails) {
      this.ensureFieldsWrapped(details.objectType);
    }

    ensureFieldsWrapped(objectType: GraphQLObjectType | GraphQLInterfaceType) {
      // Mark the GraphQLObjectType object to avoid re-wrapping:
      if ((objectType as any)._authFieldsWrapped) return;
      (objectType as any)._authFieldsWrapped = true;

      const fields = objectType.getFields();

      Object.keys(fields).forEach(fieldName => {
        const field: TField = fields[fieldName];

        const { resolve = defaultFieldResolver } = field;

        const next = resolve.bind(this);

        field.resolve = authenticate(next);
      });
    }
  }

  class AuthenticateUserDirective extends SchemaDirectiveVisitor {
    visitObject(type: GraphQLObjectType) {
      this.ensureFieldsWrapped(type);
    }

    visitFieldDefinition(field: TField, details: TVisitedFieldDetails) {
      this.ensureFieldsWrapped(details.objectType);
    }

    ensureFieldsWrapped(objectType: GraphQLObjectType | GraphQLInterfaceType) {
      // Mark the GraphQLObjectType object to avoid re-wrapping:
      if ((objectType as any)._authUserFieldsWrapped) return;
      (objectType as any)._authUserFieldsWrapped = true;

      const fields = objectType.getFields();

      Object.keys(fields).forEach(fieldName => {
        const field: TField = fields[fieldName];

        const { resolve = defaultFieldResolver } = field;

        const next = resolve.bind(this);

        field.resolve = authenticateUser(next);
      });
    }
  }

  return {
    authenticated: AuthenticateDirective,
    authenticatedUser: AuthenticateUserDirective
  };
}
