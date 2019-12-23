import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from '@angular/core';

@Component({
  selector: 'uqt-ui-register',
  templateUrl: './ui-register.component.html',
  styleUrls: ['./ui-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UiRegisterComponent {
  @Input() formName: string;
}
