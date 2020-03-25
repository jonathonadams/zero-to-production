import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { CodeHighlightService } from '@uqt/examples/utils';
import { moduleLoadingService, moduleProviders } from './scrolling.code';

@Component({
  selector: 'uqt-scrolling',
  templateUrl: './scrolling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollingComponent implements AfterViewInit {
  constructor(private highlightService: CodeHighlightService) {}

  moduleProviders = moduleProviders;
  moduleLoadingService = moduleLoadingService;

  ngAfterViewInit() {
    this.highlightService.highlightAll();
  }
}
