import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IExample } from '@uqt/examples/data-access';

@Component({
  selector: 'uqt-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  @Input() example: IExample;
}
