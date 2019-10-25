import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamplesFacade } from '@ngw/examples/data-access';
import { IExample } from '@ngw/types';
import { RouterFacade } from '@ngw/data-access/router';
import { EXAMPLES } from '../examples';

@Component({
  selector: 'ngw-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  example$: Observable<IExample[]>;

  constructor(
    private facade: ExamplesFacade,
    private routerFacade: RouterFacade
  ) {
    this.example$ = this.facade.filteredExample$;
  }

  ngOnInit() {
    this.facade.addExamples(EXAMPLES);
  }

  navigateToExample(example: IExample) {
    this.routerFacade.go({ path: [example.url], relative: true });
  }
}
