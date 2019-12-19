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
  secure: () =>
    import('@uqt/todos/feature-shell').then(m => m.TodosFeatureShellModule)
};
