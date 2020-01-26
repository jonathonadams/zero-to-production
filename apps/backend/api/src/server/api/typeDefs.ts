import { sync } from 'glob';
import { readFileSync } from 'fs';
import { authTypeDef } from '@uqt/backend/auth';
import { todoTypeDef } from '@uqt/backend/core-data';
import { resolve } from 'path';

function loadGraphQLSchema(filePath: string) {
  return readFileSync(resolve(__dirname, filePath), {
    encoding: 'utf-8'
  });
}

/**
 * Glob will return an array of all the files ending in .graphql from THIS FILE
 */
const typeDefs = sync('**/*.graphql', { cwd: __dirname }).map(
  loadGraphQLSchema
);

export default [authTypeDef, ...typeDefs, todoTypeDef];
