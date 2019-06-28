import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import { UsersService } from './users.service';
import { AuthUsersResolver } from './auth-user.resolver';
import { DataAccessAuthModule } from '@workspace/frontend/data-access/auth';

@NgModule({
  imports: [
    StoreModule.forFeature('usersState', reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UsersService, UsersFacade, AuthUsersResolver]
})
export class DataAccessUsersModule {}
