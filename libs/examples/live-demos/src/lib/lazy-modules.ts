import { ILazyModuleRegistry } from '@uqt/shared/utils/dynamic-module-loading';

export const LAZY_MODULES: ILazyModuleRegistry = {
  'form-builder': () =>
    import('@uqt/examples/form-builder').then(m => m.ExamplesFormBuilderModule),
  theming: () =>
    import('@uqt/examples/theming').then(m => m.ExamplesThemingModule),
  'lazy-scroll': () =>
    import('@uqt/examples/lazy-load-scrolling').then(
      m => m.ExamplesLazyLoadScrollingModule
    ),
  secure: () =>
    import('@uqt/examples/secure-todos').then(m => m.ExamplesSecureTodosModule),
  'make-it-your-own': () =>
    import('@uqt/examples/make-it-your-own').then(
      m => m.ExamplesStartYourOwnModule
    )
};
