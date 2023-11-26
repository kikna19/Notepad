import {EntityState, createEntityAdapter, EntityAdapter} from '@ngrx/entity';

export interface User {
  email: string;
  username: string;
}

export interface AuthState extends EntityState<User> {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: any;
}

export const authAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialAuthState: AuthState = authAdapter.getInitialState({
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
});
