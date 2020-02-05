import {
  animation,
  trigger,
  transition,
  animate,
  style,
  useAnimation
} from '@angular/animations';

// Create a reusable animations using the animation() method with properties being replaced at runtime
export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

// consume the animations using using the use animation and pass in the params object
export const transitionAnimations = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transAnimation, {
      params: {
        height: 0,
        opacity: 1,
        backgroundColor: 'red',
        time: '1s'
      }
    })
  ])
]);
