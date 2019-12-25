import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamplesFacade, IExample } from '@uqt/examples/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'uqt-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples$: Observable<IExample[]>;

  constructor(private facade: ExamplesFacade, private router: Router) {
    this.examples$ = this.facade.examples$;
  }

  showExample() {
    this.router.navigate(['examples', 'scroll']);
  }
}
