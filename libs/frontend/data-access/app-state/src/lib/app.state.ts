import { ActionReducerMap } from '@ngrx/store';

// The interface of the AppState
export interface AppState {}
// NOTE: All State currently belongs in feature modules
// This results in an empty interface that one of the ts lint rules error out on
// If there is any properties in the AppState, then change this in the tslint rules
// "no-empty-interface": false,

// A map of all the reducers
export const appReducer: ActionReducerMap<AppState> = {};
