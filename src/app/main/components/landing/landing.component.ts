import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {debounceTime, fromEvent, Observable, pluck} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app/app.state";
import { user } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit{

  user!: any;
  notes$!: Observable<any[]>;
  searchedNote: any[] = [];
  notesArray: any[] = [];
  sideNav: boolean = false;
  selectedIndex!: number;
  noNotes!: number;

  @ViewChildren('noteItems') noteItems!: QueryList<ElementRef>;
  @ViewChild('noteSearch', {static: true}) noteSearch!: ElementRef<HTMLInputElement>;


  constructor(
    private auth: AuthService,
    private afd: AngularFireDatabase,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.store.select(user).subscribe(console.log);



    this.auth.user()
      .subscribe((res: any) => {
        console.log(res);
        this.user = {
          displayName: res?.displayName,
          phoneNumber: res?.phoneNumber,
          photoURL: res?.photoURL,
          lastLogin: res?.metadata?.lastLoginAt,
          uid: res?.uid,
          email: res?.email,
          authed: !res?.isAnonymous
        };

        this.notes$ = this.afd.list(`notes/${this.user.uid}`).valueChanges();
        this.notes$.subscribe(res => {
          this.noNotes = res.length;
        })
      });
  }


  ngAfterViewInit(): void {
    this.checkedNote();
    this.searchNote();

  }


  checkedNote(): void {
    let prevIndex = -1;
    this.noteItems.changes.subscribe((res) => {
        this.notesArray = res.toArray();
        this.notesArray.forEach((item: any, index: number) => {
            item.nativeElement.addEventListener('click', () => {
              if (this.selectedIndex !== undefined) {
                this.notesArray[this.selectedIndex].nativeElement.style.backgroundColor = 'transparent';
                this.notesArray[this.selectedIndex].nativeElement.children[1].style.borderTopColor = '#423F3E';
              }
              if (prevIndex !== -1 && prevIndex !== this.notesArray.length) {
                this.notesArray[prevIndex].nativeElement.style.backgroundColor = 'transparent';
                this.notesArray[prevIndex].nativeElement.children[1].style.borderTopColor = '#423F3E';
              }
              item.nativeElement.style.backgroundColor = '#b98d00';
              item.nativeElement.children[1].style.borderTopColor = 'transparent';
              prevIndex = index;
            })
          }
        )
      }
    )
  }

  selectNote(note: string) {
    this.noteSearch.nativeElement.value = '';
    let arr: string[] = [];
    let items = this.notesArray.map(i => (i.nativeElement.textContent.replace(/\s/g, '').toLowerCase()));
    items.map((item: string) => {
      if (item.includes('locklocked')) {
        arr.push(item.slice(0, -13))
      } else {
        arr.push(item.slice(0, -3));
      }
    });
    arr.forEach((value: string, index: number) => {
      if (value == note.replace(/\s/g, '').toLowerCase()) {
        this.selectedIndex = index;
        this.sideNav = true;
        this.notesArray[index].nativeElement.style.backgroundColor = '#b98d00';
        this.notesArray[index].nativeElement.children[1].style.borderTopColor = 'transparent';
      } else {
        this.notesArray[index].nativeElement.style.backgroundColor = 'transparent';
        this.notesArray[index].nativeElement.children[1].style.borderTopColor = '#423F3E';
      }
    })
  }


  searchNote(): void {
    fromEvent(this.noteSearch.nativeElement, 'keyup'
    ).pipe(
      debounceTime(500),
      pluck('target', 'value'),
      filter((value: any) => !!value.trim().length),
      switchMap((note: string): any => this.search(note))
    ).subscribe((value: any) => {
      this.searchedNote = value;
    });
  }

  search(item: string): Observable<string[]> {
    return this.notes$.pipe(
      map((arr: string[]) => arr.map((item: any) => item.note)),
      map((opt: any[]) => opt.filter(note => note.includes(item.toLowerCase()))),
    );
  }

  logOut(): void {
    this.router.navigate(['/login']);
    this.auth.logOut();
  }
}
