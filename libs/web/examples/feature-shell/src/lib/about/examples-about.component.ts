import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ComponentLoaderService } from '../component-loader.service';

@Component({
  selector: 'uqt-examples-about',
  templateUrl: './examples-about.component.html',
  styleUrls: ['./examples-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesAboutComponent implements OnInit {
  @ViewChild('testOutlet', { static: true }) outlet!: ElementRef<HTMLElement>;
  constructor(private compLoader: ComponentLoaderService) {}

  ngOnInit() {}

  loadModule() {
    this.compLoader.loadComponent('example-dynamic-form').then(component => {
      this.outlet.nativeElement.appendChild(component);
    });
  }
}

// https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine/
// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules
