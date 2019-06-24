import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonThemeModule } from '@workspace/frontend/common/theme';
import { AuthUsersResolver } from './users.resolver';
import { AuthUserSate, reducer } from './+state/users.reducer';
import { AuthUserFacade } from './+state/users.facade';
import { AuthUsersEffects } from './+state/users.effects';

@NgModule({
  imports: [
    CommonThemeModule,
    StoreModule.forFeature<AuthUserSate>('authUser', reducer),
    EffectsModule.forFeature([AuthUsersEffects])
  ],
  providers: [AuthUserFacade, AuthUsersResolver]
})
export class DataAccessUserAuthModule {}
