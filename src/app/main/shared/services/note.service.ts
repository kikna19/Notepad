import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AuthService} from "../../../auth/services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  uid: any;
  textValue: boolean = false;
  notes$!: Observable<any[]>;
  notesRef$!: AngularFireList<any>
  noteValue$ = new BehaviorSubject<any>({});

  constructor(
    private afd: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.auth.user().subscribe(user => {
      this.uid = user?.uid;
    })

  }

  create(note: any, time: any) {
    return this.afd.list(`notes/${this.uid}`).push({note: note, time: time});
  }

  update(note: any, key: any) {
    return this.afd.list(`notes/${this.uid}`).update(key, note);
  }

  get() {
    this.notes$ = this.afd.list(`notes/${this.uid}`).valueChanges();
    this.notesRef$ = this.afd.list(`notes/${this.uid}`);
    this.notes$ = this.notesRef$.snapshotChanges().pipe(
      map(notes =>
        notes.map(note =>
          ({key: note.payload.key, ...note.payload.val()})
        )
      )
    )
    return this.notes$;
  }

  delete(key: any) {
    return this.afd.object(`notes/${this.uid}/${key}`).remove();
  }


}
