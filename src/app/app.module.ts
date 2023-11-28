import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SingleItemComponent} from './main/shared/components/single-item/single-item.component';
import {ConfirmComponent} from './main/shared/components/confirm/confirm.component';
import {DatePipe} from './main/shared/pipes/date.pipe';
import {LockedItemComponent} from './main/shared/components/locked-item/locked-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/auth/auth.effects";
import {AngularFireModule} from "@angular/fire/compat";
import {LandingModule} from "./main/landing.module";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import * as firebase from 'firebase/app';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appReducers, metaReducers} from "./store/app/app.reducers";
import {authState} from "./store/auth/auth.selectors";

const firebaseConfig = {
  apiKey: "AIzaSyCHf9NYrFlnm-Qp3M_WAicue_aXhh3gUWs",
  authDomain: "notepad-dashboard.firebaseapp.com",
  projectId: "notepad-dashboard",
  storageBucket: "notepad-dashboard.appspot.com",
  messagingSenderId: "163645901941",
  appId: "1:163645901941:web:4ef359962675f80b11bc3c",
  measurementId: "G-CCYTNMG0KW"
}

firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    SingleItemComponent,
    ConfirmComponent,
    DatePipe,
    LockedItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers, {
      metaReducers
    }),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    LandingModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
