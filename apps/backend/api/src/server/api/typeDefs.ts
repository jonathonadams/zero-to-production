import { authTypeDef } from '@uqt/backend/auth';
import { todoTypeDef, userTypeDef } from '@uqt/backend/core-data';
import { baseTypeDef } from './base.type';

export default [baseTypeDef, authTypeDef, userTypeDef, todoTypeDef];
