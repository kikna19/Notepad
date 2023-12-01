import {NgModule} from "@angular/core";
import {SingleItemComponent} from "./components/single-item/single-item.component";
import {ConfirmComponent} from "./components/confirm/confirm.component";
import {LockedItemComponent} from "./components/locked-item/locked-item.component";
import {AlertComponent} from "./components/error-handler/alert.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {JsonPipe} from "@angular/common";

@NgModule({
  declarations: [
    SingleItemComponent,
    ConfirmComponent,
    LockedItemComponent,
    AlertComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    JsonPipe
  ]
})
export class SharedModule {

}
