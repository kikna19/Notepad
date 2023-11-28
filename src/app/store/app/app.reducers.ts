import {hydrationMetaReducer} from "./hydration.reducers";
import {ActionReducer, MetaReducer} from "@ngrx/store";
import {authReducer} from "../auth/auth.reducers";
import {AuthState} from "../auth/auth.state";

export type AppReducers = {
  auth: ActionReducer<AuthState>;
};

export const appReducers: AppReducers = {
  auth: authReducer,
}

export const metaReducers : MetaReducer[] = [hydrationMetaReducer]
