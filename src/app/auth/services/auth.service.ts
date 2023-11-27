import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from, Observable} from "rxjs";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;
import {GoogleAuthProvider} from 'firebase/auth';
import { getAuth, signInWithPopup } from "firebase/auth";
import {signOut} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: any;

  constructor(
    private afs: AngularFireAuth
  ) {
  }

  user() {
    return this.afs.authState;
  }

  register(email: string, password: string) {
    return from(this.afs.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(this.afs.signInWithEmailAndPassword(email, password));
  }

  logOut() {
    this.afs.signOut();
  }

  google() {
    const auth = getAuth();
    signOut(auth).then(_ => console.log(_));
    auth.languageCode = 'it'
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
      }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
}
