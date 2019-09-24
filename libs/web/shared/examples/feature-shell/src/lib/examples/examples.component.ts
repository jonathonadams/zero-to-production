import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamplesFacade } from '@ngw/examples/data-access';
import { IExample } from '@ngw/types';
import { RouterFacade } from '@ngw/data-access/router';

const examples: IExample[] = [
  {
    id: '1',
    title: 'Dynamic Form',
    description:
      'With the amount of builder plate required for forms in Angular, they can become tedious quickly.\
       A dynamic form that can be used application wide can significantly simplify creating forms and standardize styling and animations.',
    url: 'form-builder',
    gitHubLink: 'some-github-link'
  },
  {
    id: '2',
    title: 'Form Builder',
    description:
      'A demonstration of using dynamic forms and user created forms',
    url: 'form-builder',
    gitHubLink: 'some-github-link'
  },
  {
    id: '3',
    title: 'Form Builder',
    description:
      'A demonstration of using dynamic forms and user created forms',
    url: 'form-builder',
    gitHubLink: 'some-github-link'
  },
  {
    id: '4',
    title: 'Form Builder',
    description:
      'A demonstration of using dynamic forms and user created forms',
    url: 'form-builder',
    gitHubLink: 'some-github-link'
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
