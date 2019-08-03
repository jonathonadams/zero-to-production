import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { UiLoginComponent } from './components/login/ui/ui-login.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';
import { DataAccessDynamicFormModule } from '@ngw/frontend/data-access/dynamic-form';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { JWTAuthService } from './services/jwt-auth.service';
import { RegisterComponent } from './components/register/register.component';
import { UiRegisterComponent } from './components/register/ui/ui-register.component';
import { UsernameAvailableValidator } from './services/username-available.validator';
import { StoreModule } from '@ngrx/store';
import { reducer, AuthState, initialState } from './+state/auth.reducer';
import { AuthComponent } from './components/auth.component';
import { RouterModule } from '@angular/router';
import { FrontendUtilsStorageModule } from '@ngw/frontend/utils/storage';
import { CommonNotificationModule } from '@ngw/frontend/utils/notifications';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomUsernameComponent } from './components/custom-username/custom-username.components';
import { CustomUsernameInputComponent } from './components/custom-username/custom-username-input.component';

const COMPONENTS = [
  AuthComponent,
  LoginComponent,
  UiLoginComponent,
  RegisterComponent,
  UiRegisterComponent,
  CustomUsernameComponent,
  CustomUsernameInputComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule, //
    CommonNotificationModule, // TODO -> maybe move these to their own auth ui module?
    ReactiveFormsModule, //
    FrontendUtilsStorageModule,
    DataAccessDynamicFormModule,
    StoreModule.forFeature<AuthState>('authState', reducer, { initialState }),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [...COMPONENTS],
  entryComponents: [CustomUsernameComponent]
})
export class RootDataAccessAuthModule {}

export class DataAccessAuthModule {
  static forRoot(): ModuleWithProviders<DataAccessAuthModule> {
    return {
      ngModule: RootDataAccessAuthModule,
      providers: [
        AuthFacade,
        AuthService,
        JWTAuthService,
        AuthGuard,
        LoggedInGuard,
        UsernameAvailableValidator,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
