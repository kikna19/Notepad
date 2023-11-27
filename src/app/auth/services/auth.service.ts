import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from, Observable} from "rxjs";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;
import {GoogleAuthProvider} from 'firebase/auth';
import {getAuth, signInWithPopup} from "firebase/auth";
import {signOut} from "@angular/fire/auth";
import User = firebase.User;


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

  google(): Observable<any> {
    const auth = getAuth();
    signOut(auth).then(_ => console.log(_));
    auth.languageCode = 'it'
    return from(signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        return result.user;
      }).catch((error) => {
        return error
      }));
  }
}
