import {ChangeDetectionStrategy, Component, Inject, Injectable} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorHandlerComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public error: { err: string }
  ) {
  }

}
