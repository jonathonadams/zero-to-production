import {
  Component,
  ChangeDetectionStrategy,
  ComponentFactory,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModuleLoaderService } from '@ztp/common/utils/dynamic-module-loading';
import { ExamplesFacade, IExample } from '@ztp/examples/data-access';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'ztp-examples-demos',
  templateUrl: './examples-demos.component.html',
  styleUrls: ['./examples-demos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesDemosComponent implements OnInit, OnDestroy {
  title = 'Examples - Zero To Production';
  description = 'Advanced Angular demos';
  examples: IExample[];
  sub: Subscription;

  constructor(
    private facade: ExamplesFacade,
    private moduleLoader: ModuleLoaderService,
    private titleService: Title,
    private meta: Meta
  ) {
    this.sub = this.facade.examples$.subscribe((examples) => {
      this.examples = examples;
    });
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.updateTag({ name: 'description', content: this.description });
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
