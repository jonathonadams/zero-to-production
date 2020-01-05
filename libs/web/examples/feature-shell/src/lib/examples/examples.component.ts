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
  // columns = 3;

  constructor(private facade: ExamplesFacade, private router: Router) {
    this.examples$ = this.facade.examples$;
  }

  showExamples() {
    this.router.navigate(['examples', 'demos']);
  }

  trackExample(i: number, e: IExample) {
    return e.id;
  }
}
