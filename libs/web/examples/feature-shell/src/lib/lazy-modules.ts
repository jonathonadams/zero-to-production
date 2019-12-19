import { ILazyModuleRegistry } from '@uqt/data-access/dynamic-module-loading';

export const LAZY_MODULES: ILazyModuleRegistry = {
  'dynamic-form': () =>
    import('@uqt/examples/dynamic-form').then(
      m => m.WebExamplesDynamicFormModule
    ),
  'form-builder': () =>
    import('@uqt/examples/form-builder').then(
      m => m.WebExamplesFormBuilderModule
    ),
  theming: () =>
    import('@uqt/examples/theming').then(m => m.WebExamplesThemingModule),
  'lazy-load-scrolling': () =>
    import('@uqt/web/examples/lazy-load-scrolling').then(
      m => m.WebExamplesLazyLoadScrollingModule
    ),
  'secure-todos': () =>
    import('@uqt/web/examples/secure-todos').then(
      m => m.WebExamplesSecureTodosModule
    )
};
