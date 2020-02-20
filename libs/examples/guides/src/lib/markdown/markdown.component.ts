import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownService } from '@uqt/examples/utils';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'uqt-examples-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {
  markdown$: Observable<string>;
  constructor(
    private mdService: MarkdownService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.markdown$ = this.route.data.pipe(
      filter(val => val !== undefined),
      switchMap(({ guide }) => this.mdService.loadMarkdown(guide))
    );
  }
}
