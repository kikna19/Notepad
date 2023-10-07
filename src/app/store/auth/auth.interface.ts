import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginSuccess = UserCredential['user'];
