import { trigger, transition, useAnimation } from '@angular/animations';
import { routerCardFlipAnimation } from '@uqt/common/animations';

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition(
    'LoginPage => RegisterPage',
    useAnimation(routerCardFlipAnimation, {
      params: {
        timing: '0.2s',
        enterFlip: 'rotateY(90deg)',
        exitFlip: 'rotateY(-90deg)'
      }
    })
  ),
  transition(
    'RegisterPage => LoginPage',
    useAnimation(routerCardFlipAnimation, {
      params: {
        timing: '0.2s',
        enterFlip: 'rotateY(-90deg)',
        exitFlip: 'rotateY(90deg)'
      }
    })
  )
]);
