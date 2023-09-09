import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthService} from "./services/auth.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AuthRoutingModule} from "./auth-routing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp({
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    }),
    RouterModule
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
