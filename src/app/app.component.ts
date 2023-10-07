import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app/app.state";
import {LoginRequest} from "./store/auth/auth.interface";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'notepad';
    authLoading$!: Observable<boolean>;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit() {
        // this.authLoading$ = this.store.select(authLoading)
        // const user: LoginRequest = {username: 'a@a2.com', password: 'Qwerty123'}
       // setTimeout(()=>{
       //     this.store.dispatch(loginRequest(user));
       // }, 2000)
    //

    }

}
