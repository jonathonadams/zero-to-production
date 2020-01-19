import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IExample, ExamplesFacade } from '@uqt/examples/data-access';

@Component({
  selector: 'uqt-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  examples$: Observable<IExample[]>;

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
