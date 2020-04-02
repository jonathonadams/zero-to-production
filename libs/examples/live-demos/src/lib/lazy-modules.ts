import { ILazyModuleRegistry } from '@ztp/common/utils/dynamic-module-loading';

export const LAZY_MODULES: ILazyModuleRegistry = {
  'form-builder': () =>
    import('@ztp/examples/form-builder').then(
      (m) => m.ExamplesFormBuilderModule
    ),
  theming: () =>
    import('@ztp/examples/theming').then((m) => m.ExamplesThemingModule),
  'lazy-scroll': () =>
    import('@ztp/examples/lazy-load-scrolling').then(
      (m) => m.ExamplesLazyLoadScrollingModule
    ),
  secure: () =>
    import('@ztp/examples/secure-todos').then(
      (m) => m.ExamplesSecureTodosModule
    ),
  'make-it-your-own': () =>
    import('@ztp/examples/make-it-your-own').then(
      (m) => m.ExamplesStartYourOwnModule
    ),
};
