import { Component } from '@angular/core';

@Component({
  selector: 'ztp-lazy-component-three',
  templateUrl: './lazy-component-three.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 600px;
        margin: 0.5rem 0;
        border-radius: 4px;
        box-shadow: 0 0 12px -2px var(--dark-primary-color);
      }
    `,
  ],
})
export class LazyComponentThree {}
