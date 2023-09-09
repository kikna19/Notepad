import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {fromEvent, Observable} from "rxjs";
import {exhaustMap, filter, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {FormValidator} from "../../validators/form-validator";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('signInBtn', {static: true, read: ElementRef}) signInBtn!: ElementRef;
  email!: string;
  password!: string;
  form: FormGroup;
  err: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, FormValidator.minLength, FormValidator.maxLength]],
    });
  }

  ngOnInit(): void {
    this.auth.logOut();
  }

  ngAfterViewInit(): void {
    this.signIn();
  }

  signIn() {
    fromEvent(this.signInBtn.nativeElement, 'click').pipe(
      filter(_ => this.form.valid),
      exhaustMap(_ => this.auth.login(this.email, this.password)),
      tap(() => this.err = this.auth.error),
      switchMap((): Observable<any> => this.auth.user()),
    ).subscribe(user => {
      if (user) {
        // this.guard.notesLoad = true;
        this.router.navigate(['/notes']);
      }
      this.form.reset();
    })
  }

  register(): void {
    this.router.navigate(['register'])
  }

  get control() {
    return this.form.controls;
  }
}
