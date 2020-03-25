import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IExample, ExamplesFacade } from '@uqt/examples/data-access';

@Component({
  selector: 'uqt-examples-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesHomeComponent {
  examples$: Observable<IExample[]>;
  constructor(private facade: ExamplesFacade, private router: Router) {
    this.examples$ = this.facade.examples$;
  }

  showExamples() {
    this.router.navigate(['examples']);
  }

  trackExample(i: number, e: IExample) {
    return e.id;
  }
}
