import { GraphQLFieldResolver } from 'graphql';
import {
  SchemaTypeOptions,
  Schema,
  SchemaType,
  SchemaDefinition,
} from 'mongoose';

export type TResolverAuthGuard = (
  resolver: GraphQLFieldResolver<any, any, any>
) => GraphQLFieldResolver<any, any, any>;

/**
 * Type safety guards for any mongoose schema
 */
// create a schema type of properties of the instance interface
type TSchemaFields<T> = {
  [key in keyof T]:
    | SchemaTypeOptions<any>
    | Function
    | string
    | Schema
    | Schema[]
    | Array<SchemaTypeOptions<any>>
    | Function[]
    | SchemaDefinition
    | SchemaDefinition[];
};

// interface SchemaDefinition {
//   [path: string]: SchemaTypeOptions<any> | Function | string | Schema | Schema[] | Array<SchemaTypeOptions<any>> | Function[] | SchemaDefinition | SchemaDefinition[];
// }

// Schema definition first converts all optional fields to required `Required<TSchemaFields<T>>`
// Then Omits the 'id' field as that does not have to be defined
type TSchemaDefinition<T> = Omit<Required<TSchemaFields<T>>, 'id' | '_id'>;
