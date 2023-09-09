import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from "./components/landing/landing.component";
import {CreateComponent} from "./components/create/create.component";

const routes: Routes = [
  {path: '', component: LandingComponent, children:[
          {path: 'create', component: CreateComponent},
          // {path: 'note/:id', component: NotepadItemComponent, outlet: 'item', resolve: [NoteResolve]},
    ]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class LandingRoutingModule { }
