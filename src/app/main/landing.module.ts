import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from "./components/landing/landing.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {LandingRoutingModule} from "./landing-routing.module";
import {CreateComponent} from "./components/create/create.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    LandingComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterLink,
    MatDividerModule,
    MatButtonModule,
    RouterOutlet,
    LandingRoutingModule,
    RouterModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class LandingModule { }
