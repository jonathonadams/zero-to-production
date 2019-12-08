import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { EXAMPLES } from './examples';

@Component({
  selector: 'uqt-examples-feature-shell',
  templateUrl: './examples-feature-shell.component.html',
  styleUrls: ['./examples-feature-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesFeatureShellComponent implements OnInit {
  routes = ['/examples', '/examples/all'];
  constructor(private facade: ExamplesFacade) {}

  ngOnInit() {
    this.facade.addExamples(EXAMPLES);
  }
}
