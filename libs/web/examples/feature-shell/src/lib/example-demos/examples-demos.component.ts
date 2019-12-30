import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleLoaderService } from '@uqt/data-access/dynamic-module-loading';
import { ExamplesFacade, IExample } from '@uqt/examples/data-access';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'uqt-examples-demos',
  templateUrl: './examples-demos.component.html',
  styleUrls: ['./examples-demos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesDemosComponent {
  examples$: Observable<IExample[]>;

  constructor(
    private facade: ExamplesFacade,
    private moduleLoader: ModuleLoaderService
  ) {
    this.examples$ = this.facade.examples$;
  }

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }

  loadModule(index: number) {
    this.examples$
      .pipe(
        take(1),
        map(exs => exs[index].url)
      )
      .subscribe(url => {
        this.moduleLoader.initLoadModule(url);
      });
  }

  trackExamples(i: number, t: IExample) {
    return t.id;
  }
}
