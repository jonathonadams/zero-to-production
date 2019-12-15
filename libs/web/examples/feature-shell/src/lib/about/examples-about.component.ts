import {
  Component,
  OnInit,
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
export class ExamplesAboutComponent implements OnInit {
  componentTags = ['dynamic-form', 'theming'];
  constructor(private moduleLoader: ModuleLoaderService) {
    this.moduleLoader.registerModule('dynamic-form', () =>
      import('@uqt/examples/dynamic-form').then(
        m => m.WebExamplesDynamicFormModule
      )
    ),
      this.moduleLoader.registerModule('theming', () =>
        import('@uqt/examples/theming').then(m => m.WebExamplesThemingModule)
      );
  }

  ngOnInit() {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }
}

// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules
