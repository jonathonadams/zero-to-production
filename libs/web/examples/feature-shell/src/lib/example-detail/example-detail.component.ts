import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IExample } from '@uqt/types';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { RouterFacade } from '@uqt/data-access/router';

@Component({
  selector: 'uqt-example-detail',
  templateUrl: './example-detail.component.html',
  styleUrls: ['./example-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailComponent {
  selectedExample$: Observable<IExample | undefined>;

  constructor(
    private facade: ExamplesFacade,
    private routerFacade: RouterFacade
  ) {
    this.selectedExample$ = this.facade.selectedExample$;

    this.routerFacade.url$
      .pipe(take(1), map(this.getExampleUrl))
      .subscribe(url => this.facade.selectExample(url));
  }

  getExampleUrl(url: string): string {
    // /examples/form-builder => ["", "examples", "form-builder"]
    const [_, __, exampleUrl] = url.split('/');
    return exampleUrl;
  }
}
