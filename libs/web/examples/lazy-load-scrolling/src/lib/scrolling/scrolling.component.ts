import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { moduleLoadingService, moduleProviders } from './scrolling.code';

@Component({
  selector: 'uqt-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollingComponent {
  constructor(private highlightService: CodeHighlightService) {}

  moduleProviders = moduleProviders;
  moduleLoadingService = moduleLoadingService;

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
