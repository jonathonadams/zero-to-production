import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ComponentFactory,
} from '@angular/core';
import { IExample } from '@uqt/examples/data-access';

@Component({
  selector: 'uqt-example-detail',
  templateUrl: './example-detail.component.html',
  styleUrls: ['./example-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDetailComponent {
  @Input() example: IExample | null;
  @Input() factory: ComponentFactory<any> | null | undefined;
}
