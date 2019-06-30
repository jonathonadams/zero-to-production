import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonLoginComponent } from './login/login.component';
import { UiLoginComponent } from './login/ui/ui-login.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomMaterialModule } from '@workspace/common/ui/custom-material';
import { DataAccessDynamicFormModule } from '@workspace/frontend/data-access/dynamic-form';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { JWTAuthService } from './services/jwt-auth.service';

@NgModule({
  declarations: [CommonLoginComponent, UiLoginComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    DataAccessDynamicFormModule,
    EffectsModule.forFeature([AuthEffects])
  ]
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
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }
}
