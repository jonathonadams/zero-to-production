import { ILazyModuleRegistry } from '@uqt/data-access/dynamic-module-loading';

export const LAZY_MODULES: ILazyModuleRegistry = {
  'form-builder': () =>
    import('@uqt/examples/form-builder').then(
      m => m.WebExamplesFormBuilderModule
    ),
  theming: () =>
    import('@uqt/examples/theming').then(m => m.WebExamplesThemingModule),
  'lazy-scroll': () =>
    import('@uqt/web/examples/lazy-load-scrolling').then(
      m => m.WebExamplesLazyLoadScrollingModule
    ),
  secure: () =>
    import('@uqt/web/examples/secure-todos').then(
      m => m.WebExamplesSecureTodosModule
    ),
  'make-it-your-own': () =>
    import('@uqt/web/examples/make-it-your-own').then(
      m => m.WebExamplesMakeItYourOwnModule
    )
};
