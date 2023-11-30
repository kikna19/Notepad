import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  user: {
    accessToken: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    lastLoginAt: string;
  }
}

export interface UserFactory {
  createModObj(sourceObj: any): UserInfo;
}

export type LoginSuccess = UserCredential['user'];

