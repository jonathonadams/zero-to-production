import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'uqt-ui-login',
  templateUrl: './ui-login.component.html',
  styleUrls: ['./ui-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLoginComponent {
  @Input() formName: string;
}
