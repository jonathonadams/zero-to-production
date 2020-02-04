import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedDataAccessApiModule } from '@uqt/shared/data-access/api';
import { SharedDataAccessAuthModule } from '@uqt/shared/data-access/auth';
import { SharedUsersDataAccessModule } from '@uqt/shared/users/data-access';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { AppEffects } from './+state/app.effects';
import { AppState, appReducerMap } from './+state/app.state';
import { ExamplesFeatureShellModule } from '@uqt/examples';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { CommonDynamicFormMaterialComponentsModule } from '@uqt/common/dynamic-form-material-components';
import { APP_COMPONENTS, APP_ERRORS } from './app.dynamic-form';
import { themeProviderFactory, ThemeService } from '@uqt/common/theme';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>(appReducerMap, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
    SharedDataAccessApiModule.forRoot(environment),
    SharedDataAccessAuthModule.forRoot({
      authServerUrl: environment.serverUrl
    }),
    SharedUsersDataAccessModule.forRoot(),
    CommonDynamicFormMaterialComponentsModule,
    CommonDynamicFormModule.forRoot({
      components: APP_COMPONENTS,
      errors: APP_ERRORS
    }),
    AppRoutingModule.forRoot(),
    ExamplesFeatureShellModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: themeProviderFactory,
      multi: true,
      deps: [ThemeService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
