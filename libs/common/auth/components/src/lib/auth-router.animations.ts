import { trigger, transition, useAnimation } from '@angular/animations';
import { slideAnimation } from '@ztp/common/animations';

export const authRouterAnimations = trigger('authRouterAnimations', [
  transition(
    'RegisterPage => LoginPage',
    useAnimation(slideAnimation, {
      params: {
        enter: 'translateY(-100%)',
        exit: 'translateY(+100%)',
        timing: '300ms',
      },
    })
  ),
  transition(
    'LoginPage => RegisterPage',
    useAnimation(slideAnimation, {
      params: {
        enter: 'translateY(+100%)',
        exit: 'translateY(-100%)',
        timing: '300ms',
      },
    })
  ),
]);
