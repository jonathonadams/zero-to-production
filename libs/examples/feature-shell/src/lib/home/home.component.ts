import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IExample, ExamplesFacade } from '@ztp/examples/data-access';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'ztp-examples-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesHomeComponent implements OnInit {
  title = 'Home - Zero To Production';
  description = 'Full Stack Monorepo Starter';
  examples$: Observable<IExample[]>;
  constructor(
    private facade: ExamplesFacade,
    private meta: Meta,
    private titleService: Title
  ) {
    this.examples$ = this.facade.examples$;
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.meta.updateTag({ name: 'description', content: this.description });
  }

  trackExample(i: number, e: IExample) {
    return e.id;
  }
}
