import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from "../app/app.state";

export const authState: MemoizedSelector<AppState, AppState> = createFeatureSelector<AppState>('auth');

export const authLoading: MemoizedSelector<AppState, boolean> =
    createSelector(authState, (state: AppState) => state.auth.loading);

export const authError: MemoizedSelector<AppState, string | null> =
    createSelector(authState, (state: AppState) => state.auth.error);

export const isAuthenticated: MemoizedSelector<AppState, boolean> =
    createSelector(authState, (state: AppState) => state.auth.isAuthenticated);

export const user: MemoizedSelector<AppState, any> =
  createSelector(authState, (state: AppState) => state.auth.user);


