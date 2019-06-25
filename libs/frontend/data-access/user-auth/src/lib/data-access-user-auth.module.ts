import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonThemeModule } from '@workspace/frontend/common/theme';
import { AuthUsersResolver } from './auth-user.resolver';
import { AuthUserSate, reducer } from './+state/auth-user.reducer';
import { AuthUserFacade } from './+state/auth-user.facade';
import { AuthUsersEffects } from './+state/auth-user.effects';

@NgModule({
  imports: [
    CommonThemeModule,
    StoreModule.forFeature<AuthUserSate>('authUser', reducer),
    EffectsModule.forFeature([AuthUsersEffects])
  ],
  providers: [AuthUserFacade, AuthUsersResolver]
})
export class DataAccessUserAuthModule {}
