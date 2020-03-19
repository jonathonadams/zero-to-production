import { Connection } from 'mongoose';
import {
  createUserModel,
  createTodoModel,
  createTodoNoteModel
} from '@uqt/server/core-data';
import {
  createRefreshTokenModel,
  createVerificationTokenModel
} from '@uqt/server/auth';

/**
 * Initialize all mongoose schemas
 *
 * Add additional schemas here
 *
 * @param connection mongoose connection
 */
export function initDbSchemasModels(conn: Connection) {
  createUserModel(conn);
  createRefreshTokenModel(conn);
  createVerificationTokenModel(conn);
  createTodoModel(conn);
  createTodoNoteModel(conn);
}
