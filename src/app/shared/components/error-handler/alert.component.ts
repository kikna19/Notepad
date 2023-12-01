import {ChangeDetectionStrategy, Component, Inject, Injectable} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {AlertEnum} from "../../entity/alert";

@Component({
  selector: 'app-error-handler',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public alert: { text: string, type: string }
  ) {
  }

  protected readonly AlertEnum = AlertEnum;
}
