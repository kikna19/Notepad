import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
import {MatDividerModule} from "@angular/material/divider";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";



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
      apiKey: "AIzaSyCHf9NYrFlnm-Qp3M_WAicue_aXhh3gUWs",
      authDomain: "notepad-dashboard.firebaseapp.com",
      projectId: "notepad-dashboard",
      storageBucket: "notepad-dashboard.appspot.com",
      messagingSenderId: "163645901941",
      appId: "1:163645901941:web:4ef359962675f80b11bc3c",
      measurementId: "G-CCYTNMG0KW"
    }),
    RouterModule,
    MatDividerModule,
    NgOptimizedImage,
    MatCheckboxModule
  ],
  providers:[
    AuthService,
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' }}
  ]
})
export class AuthModule { }
