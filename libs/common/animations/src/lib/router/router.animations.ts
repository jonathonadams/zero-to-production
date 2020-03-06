import { trigger } from '@angular/animations';
import { ROUTER_TRIGGER } from './symbols';
import { WATERFALL_ANIMATION } from './waterfall.animation';

export const ROUTER_ANIMATIONS = trigger(ROUTER_TRIGGER, [
  ...WATERFALL_ANIMATION
]);
