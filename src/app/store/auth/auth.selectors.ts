import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AuthState} from './auth.state';
import {AppState} from "../app/app.state";
import {LoginSuccess} from "./auth.interface";

const authState: MemoizedSelector<AppState, AuthState> = createFeatureSelector<AuthState>('auth');

export const authLoading: MemoizedSelector<AppState, boolean> =
    createSelector(authState, (state: AuthState) => state.loading);

export const authError: MemoizedSelector<AppState, string | null> =
    createSelector(authState, (state: AuthState) => state.error);

export const isAuthenticated: MemoizedSelector<AppState, boolean> =
    createSelector(authState, (state: AuthState) => state.isAuthenticated);

export const user: MemoizedSelector<any, any> =
  createSelector(authState, (state: any) => state)
