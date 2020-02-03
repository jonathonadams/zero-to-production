import { authTypeDef } from '@uqt/server/auth';
import { todoTypeDef, userTypeDef } from '@uqt/server/core-data';
import { baseTypeDef } from './base.type';

export default [baseTypeDef, authTypeDef, userTypeDef, todoTypeDef];
