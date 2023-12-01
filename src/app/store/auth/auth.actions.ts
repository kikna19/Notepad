import {ActionCreator, createAction, props} from '@ngrx/store';
import {LoginRequest} from "./auth.interface";

export const loginRequest: ActionCreator<string, any> = createAction('[Auth] Login Request', props<{
  user: LoginRequest
}>());
export const loginGoogleRequest: ActionCreator<string, any> = createAction('[Auth] Login Google Request');
export const loginSuccess: ActionCreator<string, any> = createAction('[Auth] Login Success', props<{
  user?: any
}>());
export const loginFailure: ActionCreator<string, any> = createAction('[Auth] Login Failure', props<{
  error: string
}>());


type AuthActionsTypes = {
  loginRequest: typeof loginRequest,
  loginSuccess: typeof loginSuccess,
  loginFailure: typeof loginFailure,
  loginGoogleRequest: typeof loginGoogleRequest,
}

export const AuthActions: AuthActionsTypes = {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginGoogleRequest
};

