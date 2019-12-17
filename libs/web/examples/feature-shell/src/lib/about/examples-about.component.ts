import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleLoaderService } from '@uqt/data-access/dynamic-module-loading';
import {
  CdkVirtualScrollViewport,
  CdkScrollable,
  CdkVirtualForOf,
  ScrollDispatcher
} from '@angular/cdk/scrolling';

@Component({
  selector: 'uqt-examples-about',
  templateUrl: './examples-about.component.html',
  styleUrls: ['./examples-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesAboutComponent {
  // @ViewChild('viewPort') private viewPort: CdkVirtualScrollViewport;
  // @ViewChild('viewContainer') private viewContainer: CdkVirtualForOf<any>;

  examples = ['dynamic-form', 'form-builder', 'theming'];

  constructor(
    private moduleLoader: ModuleLoaderService,
    private dispatcher: ScrollDispatcher
  ) {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.moduleLoader.selectFactory(tag);
  }

  ngOnInit() {
    this.moduleLoader.initLoadModule(this.examples[0]);
    this.moduleLoader.initLoadModule(this.examples[1]);

    const a = this.dispatcher.scrollContainers;
    console.log(a);
  }

  ngAfterViewInit() {
    // console.log(this.viewPort);
    // this.viewPort.scrolledIndexChange.subscribe(v => {
    //   console.log('render Range');
    //   console.log(v);
    // });
    // console.log(this.viewContainer);
  }
}

// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules
