import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'notes', loadChildren: () => import('../app/main/landing.module').then(m => m.LandingModule),
    // canLoad: [NotesGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
