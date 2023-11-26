import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  untracked,
  ViewChild
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {concatMap, fromEvent, Observable} from "rxjs";
import {exhaustMap, filter, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {FormValidator} from "../../validators/form-validator";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app/app.state";
import {loginRequest} from "../../../store/auth/auth.actions";
import {authLoading, isAuthenticated, user} from "../../../store/auth/auth.selectors";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";

@UntilDestroy()
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('signInBtn', {static: true, read: ElementRef<HTMLButtonElement>}) signInBtn: ElementRef<HTMLButtonElement>;

  public form: FormGroup;
  public user$: Observable<any>;
  public loader$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private afs: AngularFireAuth,
    public authService:AuthService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(user);
    this.loader$ = this.store.select(authLoading);

    this._createForm();
  }

  ngAfterViewInit(): void {
    this._signIn();
  }

  private _createForm(): void {
    this.form = this.fb.group({
      email: ['a@a.com', [Validators.required, Validators.email]],
      password: ['Qwerty123', [Validators.required, FormValidator.minLength, FormValidator.maxLength]],
    });
  }

  private _signIn(): void {
    const {email, password} = this.form.value;

    fromEvent(this.signInBtn.nativeElement, 'click').pipe(
      untilDestroyed(this),
      filter(() => this.form.valid),
      map(() => this.store.dispatch(loginRequest({email, password}))),
    ).subscribe();
  }

  public register(): void {
    this.router.navigate(['register'])
  }

  public get control() {
    return this.form.controls;
  }



}
