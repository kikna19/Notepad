import {NgModule} from "@angular/core";
import {SingleItemComponent} from "./components/single-item/single-item.component";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {LockedItemComponent} from "./components/locked-item/locked-item.component";
import {ErrorHandlerComponent} from "./components/error-handler/error-handler.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    SingleItemComponent,
    ConfirmComponent,
    LockedItemComponent,
    ErrorHandlerComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class SharedModule {

}
