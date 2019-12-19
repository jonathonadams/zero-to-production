import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleLoaderService } from '@uqt/data-access/dynamic-module-loading';

@Component({
  selector: 'uqt-examples-scroll',
  templateUrl: './examples-scroll.component.html',
  styleUrls: ['./examples-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesScrollComponent {
  examples = ['dynamic-form', 'form-builder', 'theming'];

  constructor(private moduleLoader: ModuleLoaderService) {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }

  ngOnInit() {
    // Load the first example
    this.moduleLoader.initLoadModule(this.examples[0]);
  }

  scrolledIndexChange(index: number) {
    // NOTE -> the itemSize property (pixels), defines when the next index
    // has loaded
    if (index < this.examples.length) {
      this.moduleLoader.initLoadModule(this.examples[index]);
    }
  }
}
