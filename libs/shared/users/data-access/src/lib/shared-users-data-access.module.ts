import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';

@NgModule({
  imports: [
    StoreModule.forFeature<fromUsers.UsersEntityState>(
      fromUsers.usersEntityStateKey,
      fromUsers.reducer
    ),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class RootSharedUsersDataAccessModule {}

@NgModule()
export class SharedUsersDataAccessModule {
  static forRoot(): ModuleWithProviders<RootSharedUsersDataAccessModule> {
    return {
      ngModule: RootSharedUsersDataAccessModule
    };
  }
}
