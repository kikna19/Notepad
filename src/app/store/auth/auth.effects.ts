import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, take, tap} from "rxjs/operators";
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
          map((loginResponse: UserCredential | any) => {
              const userInfo = loginResponse.user.multiFactor.user;
              const userPayload = {
                user: {
                  accessToken: userInfo.accessToken,
                  email: userInfo.email,
                  displayName: userInfo.displayName,
                  phoneNumber: userInfo.phoneNumber,
                  photoURL: userInfo.photoURL,
                  lastLoginAt: userInfo.lastLoginAt,
                }
              }
              return loginSuccess(userPayload);
            }
          ),
          catchError((err) => of(loginFailure({error: err || 'server_error'}))
          )
        )
      )
    )
  )

  loginGoogleRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginGoogleRequest),
      switchMap(() =>
        this.authService.google().pipe(
          map((loginResponse: any) => {
            const userPayload = {
              user: {
                accessToken: loginResponse?.accessToken,
                email: loginResponse?.email,
                displayName: loginResponse?.displayName,
                phoneNumber: loginResponse?.phoneNumber,
                photoURL: loginResponse?.photoURL,
                lastLoginAt: loginResponse?.lastLoginAt,
              }
            }
            return loginSuccess(userPayload)
          }),
          catchError((err) => of(loginFailure({error: err || 'server_error'})),
          ),
        )
      )
    )
  )

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((res: any) => {
          localStorage.setItem('state', JSON.stringify(res));
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
