import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthActions, loginFailure, loginSuccess} from "./auth.actions";
import {LoginRequest, UserInfo} from "./auth.interface";
import {AuthService} from "../../auth/services/auth.service";
import {of} from "rxjs";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {Router} from "@angular/router";
import {FactoryMethod} from "../../shared/methods/factory-method";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorHandlerComponent} from "../../shared/components/error-handler/error-handler.component";

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action: LoginRequest) =>
        this._authService.login(action.email, action.password).pipe(
          map((loginResponse: UserCredential | any) => {
              const userInfo = loginResponse.user.multiFactor.user;
              const userPayload: UserInfo = this._userFactory.createModObj(userInfo);
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
    this._actions$.pipe(
      ofType(AuthActions.loginGoogleRequest),
      switchMap(() =>
        this._authService.google().pipe(
          map((loginResponse: any) => {
            const userPayload: UserInfo = this._userFactory.createModObj(loginResponse);
            return loginSuccess(userPayload)
          }),
          catchError((err) => of(loginFailure({error: (err?.error?.code || err?.error) || 'server_error'})),
          ),
        )
      )
    )
  )

  loginSuccess$ = createEffect(() =>
      this._actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((): void => {
          this._router.navigate(['notes'])
        })
      ), {
      dispatch: false
    }
  )
  loginFailure$ = createEffect(() =>
      this._actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap((err): void => {
          this._snackBar.openFromComponent(ErrorHandlerComponent, {
            data: {
              err: JSON.parse(JSON.stringify(err.error.code))
            }
          })
        })
      ), {
      dispatch: false
    }
  )


  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  private _userFactory: FactoryMethod = new FactoryMethod();
}
