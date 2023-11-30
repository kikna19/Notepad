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
import {FactoryMethod} from "../../main/shared/methods/factory-method";

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap((action: LoginRequest) =>
        this.authService.login(action.email, action.password).pipe(
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
    this.actions$.pipe(
      ofType(AuthActions.loginGoogleRequest),
      switchMap(() =>
        this.authService.google().pipe(
          map((loginResponse: any) => {
            const userPayload: UserInfo = this._userFactory.createModObj(loginResponse);
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
        tap((): void => {
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

  private _userFactory: FactoryMethod = new FactoryMethod();
}
