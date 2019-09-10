import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamplesFacade } from '@ngw/shared/examples/data-access';
import { IExample } from '@ngw/shared/interfaces';
import { RouterFacade } from '@ngw/frontend/data-access/router';

const examples: IExample[] = [
  {
    id: '1',
    title: 'Form Builder',
    description:
      'A demonstration of using dynamic forms and user created forms',
    url: 'form-builder'
  }
];

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
    this.facade.addExamples(examples);
  }

  navigateToExample(example: IExample) {
    this.routerFacade.go({ path: [example.url], relative: true });
  }
}
