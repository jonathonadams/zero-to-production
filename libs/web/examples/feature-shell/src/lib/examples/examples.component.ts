import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { RouterFacade } from '@uqt/data-access/router';
import { IExample } from 'libs/web/examples/data-access/src/lib/example.interface';

@Component({
  selector: 'uqt-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples$: Observable<IExample[]>;

  constructor(
    private facade: ExamplesFacade,
    private routerFacade: RouterFacade
  ) {
    this.examples$ = this.facade.examples$;
  }

  selectExample(example: IExample) {
    this.facade.selectExample(example.url);
    this.routerFacade.go({ path: ['examples', example.url] });
  }
}
