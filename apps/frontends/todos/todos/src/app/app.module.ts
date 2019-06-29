import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DataAccessApiModule } from '@workspace/frontend/data-access/api';
import { DataAccessAuthModule } from '@workspace/frontend/data-access/auth';
import { DataAccessUsersModule } from '@workspace/frontend/data-access/users';
import {
  AppState,
  debug,
  appReducer,
  AppEffects
} from '@workspace/frontend/data-access/app-state';
import { DataAccessRouterModule } from '@workspace/frontend/data-access/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>(appReducer, {
      metaReducers: !environment.production ? [debug] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    DataAccessApiModule.forRoot(environment),
    DataAccessAuthModule.forRoot(),
    DataAccessUsersModule.forRoot(),
    DataAccessRouterModule,
    AppRoutingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
