import {Injectable} from '@angular/core';
import {AlertComponent} from "../components/error-handler/alert.component";
import {AlertEnum, alertText} from "../entity/alert";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }

  public error(errorText: string): void {
    this._showAlert(errorText, AlertEnum.ERROR, 10000);
  }

  public success(successText: string): void {
    this._showAlert(successText, AlertEnum.SUCCESS, 4000);
  }

  private _showAlert(msg: string, type: string, duration: number): void {
    const text = alertText[msg] || msg;
    this._snackBar.openFromComponent(AlertComponent, {
      data: {
        text,
        type
      },
      horizontalPosition: 'start',
      duration
    })
  }
}
