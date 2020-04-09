import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'button[ztp-raised-button]',
  exportAs: 'ztpRaisedButton',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaisedButtonComponent {}
