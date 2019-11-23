import { Injectable, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
declare const Prism: any;

@Injectable()
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }

  highlightElement(el: ElementRef) {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightElement(el.nativeElement);
    }
  }
}
