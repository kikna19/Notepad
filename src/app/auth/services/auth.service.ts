import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from, Observable, of} from "rxjs";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;
import {GoogleAuthProvider} from 'firebase/auth';
import {getAuth, signInWithPopup} from "firebase/auth";
import {signOut} from "@angular/fire/auth";
import User = firebase.User;
import {get} from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _error: any;
  private _auth: any;

  constructor(
    private afs: AngularFireAuth
  ) {
    this._auth = getAuth();
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
    return from(
      signInWithPopup(this._auth, new GoogleAuthProvider())
        .then((result) => result.user)
        .catch((error) => {
          throw error;
        })
    );
  }

}
