import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from "../app/app.state";
import {AuthState} from "./auth.state";

export const authState: MemoizedSelector<AuthState, AuthState> = createFeatureSelector<AuthState>('auth');

export const authLoading: MemoizedSelector<AuthState, boolean> =
    createSelector(authState, (state: AuthState) => state.loading);

export const authError: MemoizedSelector<AuthState, string | null> =
    createSelector(authState, (state: AuthState) => state.error);

export const isAuthenticated: MemoizedSelector<AuthState, boolean> =
    createSelector(authState, (state: AuthState) => state.isAuthenticated);

export const user: MemoizedSelector<AuthState, any> =
  createSelector(authState, (state: AuthState) => state.user);


