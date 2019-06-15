import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLoginComponent } from './login/login.component';
import { UiLoginComponent } from './login/ui/ui-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { JWTAuthService } from './services/jwt-auth.service';

@NgModule({
  declarations: [CommonLoginComponent, UiLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootSharedAuthModule {}

export class SharedAuthModule {
  static forRoot(): ModuleWithProviders<SharedAuthModule> {
    return {
      ngModule: RootSharedAuthModule,
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
