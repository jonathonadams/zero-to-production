import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Debounce } from './debounce.decorator';

@Directive({
  selector: '[scrollNavigation]'
})
export class ScrollNavigationDirective implements OnInit {
  constructor(private router: Router) {}

  @Input() routes!: string[];

  @HostListener('wheel', ['$event'])
  @Debounce()
  onWheelScroll(event: WheelEvent) {
    const index = this.routes.indexOf(this.router.url);
    if (index !== -1) {
      // Scroll down
      if (event.deltaY > 0) {
        if (index < this.routes.length - 1) {
          this.router.navigate([this.routes[index + 1]]);
        }
      } else {
        // Scroll up
        if (index > 0) {
          this.router.navigate([this.routes[index - 1]]);
        }
      }
    }
  }

  ngOnInit() {
    if (!this.routes) throw new Error('No routes have been defined');
  }
}
