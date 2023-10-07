import {createReducer, on} from '@ngrx/store';
import {authAdapter, AuthState, initialAuthState} from './auth.state';
import {AuthActions} from "./auth.actions";

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginRequest, (state: AuthState) => ({...state, loading: true, error: null})),

  on(AuthActions.loginSuccess, (state: AuthState, {user}) => {
    return {
      ...state,
      isAuthenticated: true,
      loading: false,
      error: null,
      user,
    };
  }),
  on(AuthActions.loginFailure, (state, {error}) => ({...state, loading: false, error})),
);
