import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import * as fromAuth from './+state/auth.reducer';
import { AUTH_SERVER_URL } from './services/auth.service';

@NgModule({
  imports: [
    StoreModule.forFeature<fromAuth.AuthState>(
      fromAuth.authStateKey,
      fromAuth.reducer
    ),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootDataAccessAuthModule {}

export class DataAccessAuthModule {
  static forRoot({
    authServerUrl = ''
  }): ModuleWithProviders<DataAccessAuthModule> {
    return {
      ngModule: RootDataAccessAuthModule,
      providers: [
        { provide: AUTH_SERVER_URL, useValue: authServerUrl },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
