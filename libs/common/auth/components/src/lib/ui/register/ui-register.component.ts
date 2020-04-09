import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ztp-ui-register',
  templateUrl: './ui-register.component.html',
  styleUrls: ['./ui-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRegisterComponent {
  @Input() formName: string;
}
