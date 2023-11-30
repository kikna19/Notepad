import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
import {MatMenuModule} from "@angular/material/menu";
import {LoaderComponent} from "../shared/components/loader/loader.component";

@NgModule({
  declarations: [
    LandingComponent,
    CreateComponent,
    LoaderComponent
  ],
  exports: [
    LoaderComponent
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
    MatSnackBarModule,
    MatMenuModule,
    NgOptimizedImage
  ]
})
export class LandingModule { }
