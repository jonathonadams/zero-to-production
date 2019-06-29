import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';
import { UsersService } from './users.service';
import { AuthUsersResolver } from './auth-user.resolver';

@NgModule({
  imports: [
    StoreModule.forFeature('usersState', reducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class RootDataAccessUsersModule {}

@NgModule()
export class DataAccessUsersModule {
  static forRoot(): ModuleWithProviders<DataAccessUsersModule> {
    return {
      ngModule: RootDataAccessUsersModule,
      providers: [UsersService, UsersFacade, AuthUsersResolver]
    };
  }
}
