import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleLoaderService } from '@uqt/data-access/dynamic-module-loading';

@Component({
  selector: 'uqt-examples-about',
  templateUrl: './examples-about.component.html',
  styleUrls: ['./examples-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesAboutComponent {
  examples = ['dynamic-form', 'form-builder', 'theming'];

  constructor(private moduleLoader: ModuleLoaderService) {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }
}

// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules
