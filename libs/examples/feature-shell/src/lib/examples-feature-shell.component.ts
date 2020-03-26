import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExamplesFacade, EXAMPLES } from '@ztp/examples/data-access';

@Component({
  selector: 'ztp-examples-feature-shell',
  templateUrl: './examples-feature-shell.component.html',
  styleUrls: ['./examples-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesFeatureShellComponent {
  constructor(private facade: ExamplesFacade) {
    this.facade.addExamples(EXAMPLES);
  }
}
