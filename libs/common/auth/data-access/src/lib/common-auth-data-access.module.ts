import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import * as fromAuth from './+state/auth.reducer';
import { AUTH_SERVER_URL } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

@NgModule({
  imports: [
    StoreModule.forFeature<fromAuth.AuthState>(
      fromAuth.authStateKey,
      fromAuth.reducer
    ),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootCommonAuthDataAccessModule {}

export class CommonAuthDataAccessModule {
  static forRoot({ authServerUrl = '' } = {}): ModuleWithProviders<
    CommonAuthDataAccessModule
  > {
    return {
      ngModule: RootCommonAuthDataAccessModule,
      providers: [
        { provide: AUTH_SERVER_URL, useValue: authServerUrl },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    };
  }
}
