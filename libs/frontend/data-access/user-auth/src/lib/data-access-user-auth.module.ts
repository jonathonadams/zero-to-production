import { NgModule } from '@angular/core';
import { UsersFacade } from '@workspace/frontend/data-access/users';
import { AuthUsersResolver } from '..';
import { StoreModule } from '@ngrx/store';
import { AuthUserSate, reducer } from './+state/users.reducer';

@NgModule({
  imports: [StoreModule.forFeature<AuthUserSate>('authUser', reducer)],
  providers: [UsersFacade, AuthUsersResolver]
})
export class DataAccessUserAuthModule {}
