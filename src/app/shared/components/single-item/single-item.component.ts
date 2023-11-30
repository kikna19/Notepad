import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fromEvent, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../../services/note.service";
import {filter, map} from "rxjs/operators";
import gsap from 'gsap'
@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent {

  @ViewChild('lockN', {static: true, read: ElementRef}) lockN!: ElementRef;
  @ViewChild('lockForm', {static: true, read: ElementRef}) lockForm!: ElementRef;

  @ViewChild('pin', {static: true, read: ElementRef}) pin!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPin', {static: true, read: ElementRef}) confPin!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  note!: any;
  delete$ = new Subject<boolean>();
  lockedOpen: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.route.data.subscribe(res => {
      this.note = res[0];
    });
    this.form = this.fb.group({
      pin: ['', [Validators.required]],
      confirmPin: ['', [Validators.required]]
    })
  }

  deleteNote(key: any) {
    this.noteService.delete(key).then(() => {
      return this.router.navigate(['/notes']);
    })
  }

  updateNote() {
    this.noteService.noteValue$.next(this.note);
    return this.router.navigate([{outlets: {primary: 'create', item: null}}],
      {relativeTo: this.route.parent});
  }

  ngAfterViewInit(): void {
    fromEvent(document.body, 'click').pipe(
      filter(() => this.lockedOpen),
      filter(e => ![
        this.lockN.nativeElement,
        this.pin.nativeElement,
        this.confPin.nativeElement,
        this.lockForm.nativeElement,
        document.getElementById('noteBtn'),
        document.getElementById('noteIcon'),
      ].some(elem => e.target === elem)),
      map(() => this.lockClose()),
    ).subscribe();
  }


  openNote(e: any) {
    this.note.locked = false;
  }

  unlockNote(key: any) {
    this.note.locked = false;
    this.noteService.update(
      {
        key: this.note.key,
        note: this.note.note,
        time: this.note.time,
        lock: null,
        locked: false,
      }, key)
  }

  lockNote(key: any): void {
    let pinCode = this.form.get('pin')?.value;
    if (this.form.valid) {
      this.noteService.update(
        {
          key: this.note.key,
          note: this.note.note,
          time: this.note.time,
          lock: pinCode,
          locked: true,
        }, key).then(() => {
        this.lockClose();
        this.router.navigate(['/notes']);
      })
    }
  }


  lockOpen(): void {
    gsap.to(this.lockN.nativeElement, {
      duration: .5,
      display: 'block',
      y: '35rem',
      ease: 'none',
    });
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.lockedOpen = true;
  }


  lockClose(): void {
    gsap.to(this.lockN.nativeElement, {
      duration: 1,
      y: '-30rem',
      ease: 'none',
    });
    this.renderer.removeStyle(document.body, 'overflow');
    this.lockedOpen = false;
  }

  numbersOnly(e: any){
    const input = String.fromCharCode(e.keyCode);
    if (!/^[0-9]*$/.test(input)) {
      e.preventDefault();
    }
  }}
