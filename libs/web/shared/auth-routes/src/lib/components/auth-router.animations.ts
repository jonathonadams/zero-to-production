import { trigger, transition, useAnimation } from '@angular/animations';
import { routerCardFlipAnimation } from '@uqt/common/animations';

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition(
    'LoginPage => RegisterPage',
    useAnimation(routerCardFlipAnimation())
  ),
  transition(
    'RegisterPage => LoginPage',
    useAnimation(routerCardFlipAnimation({ flipLeft: true }))
  )
]);
