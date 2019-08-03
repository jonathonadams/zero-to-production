import { trigger, transition, useAnimation } from '@angular/animations';
import { createCardFlipAnimation } from '@ngw/frontend/common/animations';

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition(
    'LoginPage => RegisterPage',
    useAnimation(createCardFlipAnimation())
  ),
  transition(
    'RegisterPage => LoginPage',
    useAnimation(createCardFlipAnimation({ flipLeft: true }))
  )
]);
