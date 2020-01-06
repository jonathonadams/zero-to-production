import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DataAccessApiModule } from '@uqt/data-access/api';
import { DataAccessAuthModule } from '@uqt/data-access/auth';
import { DataAccessUsersModule } from '@uqt/data-access/users';
import { TodosFeatureShellModule } from '@uqt/todos/feature-shell';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { AppEffects } from './+state/app.effects';
import { AppState, appReducerMap } from './+state/app.state';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { DynamicFormMaterialComponentsModule } from '@uqt/common/dynamic-form-material-components';
import { APP_COMPONENTS, APP_ERRORS } from './app.dynamic-form';

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
    DataAccessApiModule.forRoot(environment),
    DataAccessAuthModule.forRoot(),
    DataAccessUsersModule.forRoot(),
    DynamicFormModule.forRoot({
      components: APP_COMPONENTS,
      errors: APP_ERRORS
    }),
    DynamicFormMaterialComponentsModule,
    AppRoutingModule.forRoot(),
    TodosFeatureShellModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
