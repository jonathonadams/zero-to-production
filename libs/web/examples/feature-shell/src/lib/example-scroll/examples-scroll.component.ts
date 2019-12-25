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
  modulesLoaded = 0;

  examples = [
    'dynamic-form',
    'form-builder',
    'theming',
    'lazy-load-scrolling',
    'secure'
  ];

  constructor(private moduleLoader: ModuleLoaderService) {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }

  ngOnInit() {
    // Load the first example
    this.loadModule(0);
  }

  loadModule(index: number) {
    this.moduleLoader.initLoadModule(this.examples[index]);
  }
}
