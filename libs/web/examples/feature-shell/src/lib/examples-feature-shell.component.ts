import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { EXAMPLES } from 'libs/web/examples/data-access/src/lib/examples';

@Component({
  selector: 'uqt-examples-feature-shell',
  templateUrl: './examples-feature-shell.component.html',
  styleUrls: ['./examples-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesFeatureShellComponent {
  constructor(private facade: ExamplesFacade) {
    this.facade.addExamples(EXAMPLES);
  }
}
