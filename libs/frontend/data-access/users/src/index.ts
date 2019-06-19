export { DataAccessUsersModule } from './lib/data-access-users.module';
export { UsersFacade } from './lib/+state/users.facade';
export { UsersService } from './lib/users.service';
export * from './lib/+state/users.actions';
// selectUserEntities needs to be exported for the user auth module.
export { selectUserEntities } from './lib/+state/users.reducer';
