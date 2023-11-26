import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

    @ViewChild('registerBtn', {static: true, read: ElementRef<HTMLButtonElement>}) registerBtn: ElementRef<HTMLButtonElement>;

    public form: FormGroup;
    public controls: string[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
        this._createForm();
    }

    ngAfterViewInit(): void {
        this._register();
    }

    private _createForm(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            password: ['', [Validators.required]],
            repeatPassword: ['', [Validators.required]],
        });
        this._getControls();
    }

    private _register() {
        // fromEvent(this.registerBtn.nativeElement, 'click').pipe(
        //   filter(_ => this.form.valid),
        //   exhaustMap(_ => this.auth.register('asd@asd.com', 'Qwerty123')),
        //   tap(() => this.err = this.auth.error),
        //   switchMap((): Observable<any> => this.auth.user()),
        // ).subscribe(user => {
        //   if (user) {
        //     this.router.navigate(['/notes']);
        //   }
        //   this.form.reset();
        // })
    }


    login(): void {
        this.router.navigate(['login'])
    }

    private _getControls(): void {
        for (let i in this.form.controls) {
            this.controls.push(i);
        }
    }

}
