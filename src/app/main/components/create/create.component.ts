import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, fromEvent} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {exhaustMap, filter, tap} from "rxjs/operators";
import {NoteService} from "../../../shared/services/note.service";
import {ConfirmComponent} from "../../../shared/components/confirm/confirm.component";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  form: FormGroup;
  textArea: any;
  noteValue!: any;

  @ViewChild('saveBtn', {static: true, read: ElementRef}) saveBtn!: ElementRef;
  @ViewChild('formElement', {static: true}) formElement!: ElementRef;

  time$ = new BehaviorSubject<any>(new Date().toDateString());


  constructor(
    private auth: AuthService,
    public noteService: NoteService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      text: ['', [Validators.required]]
    })

  }

  ngOnInit() {
    this.noteValue = this.noteService.noteValue$.value;
    if (this.noteValue) {
      this.textArea = this.noteValue.note;
      this.cdr.detectChanges();
    }
  }


  ngAfterViewInit(): void {
    this.createNote();
    this.closeSnack();
  }

  createNote() {
    fromEvent(this.saveBtn.nativeElement, 'click').pipe(
      exhaustMap((): any => {
        if (Object.keys(this.noteValue).length !== 0) {
          return this.confirmUpdate();
        } else if (Object.keys(this.noteValue).length == 0) {
          return this.confirm();
        }
      }),
    ).subscribe();
  }


  confirm() {
    return this.snack.openFromComponent(ConfirmComponent, {
      data: {text: this.textArea, time: this.time$.value},
    }).afterDismissed().pipe(
      filter(() => this.noteService.textValue),
      tap(() => this.form.reset())
    )
  }

  confirmUpdate() {
    return this.snack.openFromComponent(ConfirmComponent, {
      data: {note: {key: this.noteValue.key, note: this.textArea, time: this.noteValue.time}},
    }).afterDismissed().pipe(
      filter(() => this.noteService.textValue),
      tap(() => this.form.reset())
    )

  }

  closeSnack(): void {
    fromEvent(document.body, 'click').pipe(
      filter(e => ![
        document.getElementById('saveBtn'),
        document.getElementById('saveIcon'),
      ].some(elem => e.target == elem)),
    ).subscribe(() => {
      this.snack.dismiss();
    })
  }

  ngOnDestroy(): void {
    this.noteService.noteValue$.next({});
  }
}
