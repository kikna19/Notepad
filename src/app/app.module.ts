import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './main/components/create/create.component';
import { SingleItemComponent } from './main/shared/components/single-item/single-item.component';
import { ConfirmComponent } from './main/shared/components/confirm/confirm.component';
import { DatePipe } from './main/shared/pipes/date.pipe';
import { LockedItemComponent } from './main/shared/components/locked-item/locked-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./auth/auth.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/auth/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/auth/auth.effects";


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
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
