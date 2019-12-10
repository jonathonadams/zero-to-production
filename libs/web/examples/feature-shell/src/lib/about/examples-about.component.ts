import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ComponentLoaderService } from '../component-loader.service';
import { ExampleDynamicFormComponent } from '@uqt/examples/dynamic-form';

@Component({
  selector: 'uqt-examples-about',
  templateUrl: './examples-about.component.html',
  styleUrls: ['./examples-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesAboutComponent implements OnInit {
  @ViewChild('testOutlet', { static: true }) outlet!: ElementRef<HTMLElement>;

  componentTags = ['example-dynamic-form'];
  constructor(private compLoader: ComponentLoaderService) {}

  ngOnInit() {
    this.compLoader.registerModule('example-dynamic-form', {
      modulePath: () =>
        import('@uqt/examples/dynamic-form').then(
          m => m.WebExamplesDynamicFormModule
        ),
      moduleRef: null,
      entryComponent: ExampleDynamicFormComponent
    });
  }

  loadModule(tag: string) {
    return this.compLoader.loadComponent(tag);
  }
}

// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules
