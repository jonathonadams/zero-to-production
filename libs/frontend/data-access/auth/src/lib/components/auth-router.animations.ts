import { trigger, transition, useAnimation } from '@angular/animations';
import { cardFlipAnimation } from '@ngw/frontend/common/animations';

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition('LoginPage => RegisterPage', useAnimation(cardFlipAnimation)),
  transition(
    'RegisterPage => LoginPage',
    useAnimation(cardFlipAnimation, {
      params: {
        enterFlip: '-90deg',
        exitFlip: '+90deg'
      }
    })
  )
]);
