import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[scrollNavigation]'
})
export class ScrollNavigationDirective implements OnInit {
  constructor(private router: Router) {}

  @Input() routes!: string[];

  @HostListener('wheel', ['$event'])
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

// export function Debounce(delay: number = 300): MethodDecorator {
//   return function(
//     target: any,
//     propertyKey: string | Symbol,
//     descriptor: PropertyDescriptor
//   ) {
//     const original = descriptor.value;
//     const key = `__timeout__${propertyKey}`;

//     descriptor.value = function(...args: any[]) {
//       clearTimeout((this as any)[key]);
//       (this as any)[key] = setTimeout(() => original.apply(this, args), delay);
//     };

//     return descriptor;
//   };
// }
