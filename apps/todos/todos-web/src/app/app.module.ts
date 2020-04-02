import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CommonDataAccessApiModule } from '@ztp/common/data-access/api';
import {
  CommonAuthDataAccessModule,
  authProviderFactory,
  AuthService,
} from '@ztp/common/auth/data-access';
import { SharedUsersDataAccessModule } from '@ztp/shared/users/data-access';
import { TodosFeatureShellModule } from '@ztp/todos/feature-shell';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppEffects } from './+state/app.effects';
import { AppState, appReducerMap } from './+state/app.state';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { CommonDynamicFormMaterialComponentsModule } from '@ztp/common/dynamic-form-material-components';
import { APP_COMPONENTS, APP_ERRORS } from './app.dynamic-form';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>(appReducerMap),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    CommonDataAccessApiModule.forRoot(environment),
    CommonAuthDataAccessModule.forRoot({
      authServerUrl: environment.serverUrl,
    }),
    SharedUsersDataAccessModule.forRoot(),
    CommonDynamicFormModule.forRoot({
      components: APP_COMPONENTS,
      errors: APP_ERRORS,
    }),
    CommonDynamicFormMaterialComponentsModule,
    AppRoutingModule.forRoot(),
    TodosFeatureShellModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: authProviderFactory,
      multi: true,
      deps: [AuthService],
    },
  ],
})
export class AppModule {}
