import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './+state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './+state/users.effects';
import { UsersService } from './users.service';
import { UsersFacade } from './+state/users.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('usersState', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  providers: [UsersService, UsersFacade]
})
export class DataAccessUsersModule {}
