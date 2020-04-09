import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'button[ztp-icon-button]',
  exportAs: 'ZtpIconButton',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {}
