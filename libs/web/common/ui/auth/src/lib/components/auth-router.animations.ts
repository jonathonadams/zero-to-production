import { trigger, transition, useAnimation } from '@angular/animations';
import { routerCardFlipAnimation } from '@uqt/common/animations';

const flip = routerCardFlipAnimation();
const flipLeft = routerCardFlipAnimation({ flipLeft: true });

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition('LoginPage => RegisterPage', useAnimation(flip)),
  transition('RegisterPage => LoginPage', useAnimation(flipLeft))
]);
