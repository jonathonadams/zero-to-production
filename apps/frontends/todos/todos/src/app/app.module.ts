import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedDataAccessModule } from '@workspace/frontend/shared/data-access';

import { AppState, appReducers } from './app.state';

import { SharedAuthModule } from '@workspace/frontend/shared/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DataAccessUsersModule } from '@workspace/frontend/data-access/users';
import { DataAccessUserAuthModule } from '@workspace/frontend/data-access/user-auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>(appReducers, {
      metaReducers: [debug],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SharedDataAccessModule.forRoot(environment),
    SharedAuthModule.forRoot(),
    DataAccessUserAuthModule,
    DataAccessUsersModule,
    AppRoutingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// Meta reducers are like middleware thar run before any other reducer
// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
