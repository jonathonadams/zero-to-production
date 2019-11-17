import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ExamplesFacade } from '@ngw/examples/data-access';
import { Observable } from 'rxjs';
import { IExample } from '@ngw/types';
import { RouterFacade } from '@ngw/data-access/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ngw-example-detail',
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
