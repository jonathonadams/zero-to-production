import { DocumentNode } from 'graphql';
import { ITypeDefinitions } from 'apollo-server-koa';
import { baseTypeDef } from './base.type';

export function createTypeDefs(...typeDefs: DocumentNode[]): ITypeDefinitions {
  return [baseTypeDef, ...typeDefs];
}
