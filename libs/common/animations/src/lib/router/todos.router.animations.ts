import { trigger, transition, useAnimation } from '@angular/animations';
import { ROUTER_TRIGGER } from './symbols';
import { WATERFALL_ANIMATION } from './waterfall.animation';
import { slideAnimation } from './slide.animation';

export const ROUTER_ANIMATIONS = trigger(ROUTER_TRIGGER, [
  transition(
    'AllTodos => TodoDetail',
    useAnimation(slideAnimation, {
      params: {
        enter: 'translateX(+100%)',
        exit: 'translateX(-100%)',
        timing: '300ms',
      },
    })
  ),
  transition(
    'TodoDetail => AllTodos',
    useAnimation(slideAnimation, {
      params: {
        enter: 'translateX(-100%)',
        exit: 'translateX(+100%)',
        timing: '300ms',
      },
    })
  ),
  ...WATERFALL_ANIMATION,
]);
