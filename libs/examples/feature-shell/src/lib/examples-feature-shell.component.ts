import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExamplesFacade, EXAMPLES } from '@uqt/examples/data-access';

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

  navButtons = [
    { label: 'Home', link: '/' },
    { label: 'Examples', link: '/examples' },
    { label: 'Guides', link: '/guides' }
  ];
}
