import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModuleLoaderService } from '@ztp/shared/utils/dynamic-module-loading';
import { ExamplesFacade, IExample } from '@ztp/examples/data-access';

@Component({
  selector: 'ztp-examples-demos',
  templateUrl: './examples-demos.component.html',
  styleUrls: ['./examples-demos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDemosComponent implements OnDestroy {
  examples: IExample[];
  sub: Subscription;

  constructor(
    private facade: ExamplesFacade,
    private moduleLoader: ModuleLoaderService
  ) {
    this.sub = this.facade.examples$.subscribe((examples) => {
      this.examples = examples;
    });
  }

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }

  loadModule(index: number) {
    const example = this.examples[index];
    // The dynamic form module is NOT lazy loaded
    if (example && example.url !== 'dynamic-form') {
      this.moduleLoader.initLoadModule(example.url);
    }
  }

  trackExamples(i: number, t: IExample) {
    return t.id;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
