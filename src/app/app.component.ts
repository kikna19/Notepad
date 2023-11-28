import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState, getInitialState} from "./store/app/app.state";
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
        const initialState = getInitialState();
        this.store.dispatch({ type: 'HYDRATE', payload: initialState });
    }

    ngOnInit() {
    }

}
