import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {AuthActions, loginFailure, loginSuccess} from "./auth.actions";
import {LoginRequest, LoginSuccess} from "./auth.interface";
import {AuthService} from "../../auth/services/auth.service";
import {of} from "rxjs";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action: LoginRequest) =>
        this.authService.login(action.email, action.password).pipe(
          map((loginResponse: UserCredential) => {
            console.log(loginResponse);
            return loginSuccess(loginResponse)
          }),
          catchError((err) => of(loginFailure({error: err || 'server_error'}))
          )
        )
      )
    )
  )

  loginGoogleRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginGoogleRequest),
      switchMap((action: LoginRequest) =>
        this.authService.google().pipe(
          map((loginResponse: any) => {
            console.log(loginResponse);
            const userPayload = {
              accessToken: loginResponse.accessToken,
              email: loginResponse.email,
              displayName: loginResponse.displayName,
              phoneNumber: loginResponse.phoneNumber,
              photoURL: loginResponse.photoURL,
              lastLoginAt: loginResponse.lastLoginAt,
            }
            return loginSuccess(loginResponse.reloadUserInfo)
          }),
          catchError((err) => of(loginFailure({error: err || 'server_error'}))
          )
        )
      )
    )
  )

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((res: any) => {

          this.router.navigate(['notes'])
        })
      ), {
      dispatch: false
    }
  )


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
