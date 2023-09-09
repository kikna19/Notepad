import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {fromEvent, Observable} from "rxjs";
import {catchError, exhaustMap, filter, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {FormValidator} from "../../validators/form-validator";


@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls:['register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  email!: string;
  password!: string;
  err: any;
  @ViewChild('registerBtn', {static: true, read: ElementRef}) registerBtn!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, FormValidator.minLength, FormValidator.maxLength]],
    })
  }

  ngOnInit(): void {
    this.auth.logOut();
  }

  ngAfterViewInit(): void {
    this.register();
  }

  register() {
    fromEvent(this.registerBtn.nativeElement, 'click').pipe(
      filter(_ => this.form.valid),
      exhaustMap(_ => this.auth.register(this.email, this.password)),
      tap(() => this.err = this.auth.error),
      switchMap((): Observable<any> => this.auth.user()),
    ).subscribe(user => {
      if (user) {
        this.router.navigate(['/notes']);
      }
      this.form.reset();
    })
  }


  login(): void {
    this.router.navigate(['login'])
  }

  get control() {
    return this.form.controls;
  }

  clearError(e: any) {
    this.err = '';
  }
}
