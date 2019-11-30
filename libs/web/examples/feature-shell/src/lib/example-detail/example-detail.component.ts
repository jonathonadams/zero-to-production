import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ExamplesFacade } from '@uqt/examples/data-access';
import { Subscription } from 'rxjs';
import { IExample } from '@uqt/types';
import { RouterFacade } from '@uqt/data-access/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'uqt-example-detail',
  templateUrl: './example-detail.component.html',
  styleUrls: ['./example-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDetailComponent implements OnDestroy {
  selectedExample: IExample | undefined;

  private sub: Subscription;

  constructor(
    private facade: ExamplesFacade,
    private routerFacade: RouterFacade
  ) {
    this.sub = this.facade.selectedExample$.subscribe(
      example => (this.selectedExample = example)
    );

    this.routerFacade.url$
      .pipe(take(1), map(this.getExampleUrl))
      .subscribe(url => this.facade.selectExample(url));
  }

  getExampleUrl(url: string): string {
    // /examples/form-builder => ["", "examples", "form-builder"]
    const [_, __, exampleUrl] = url.split('/');
    return exampleUrl;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
