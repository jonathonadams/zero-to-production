import {
  Injectable,
  Injector,
  NgModuleFactory,
  Type,
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';

export interface IModuleRegistry {
  modulePath: () => Promise<any>;
  moduleRef: any;
  entryComponent: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  private registry: Map<string, IModuleRegistry> = new Map();

  registerModule(path: string, moduleRegistry: IModuleRegistry): void {
    this.registry.set(path, moduleRegistry);
  }

  private getRegisteredModule(path: string): IModuleRegistry | undefined {
    return this.registry.get(path);
  }
  // private componentRegistry: {
  //   [key: string]: { modulePath: () => Promise<any>; moduleRef: any };
  // } = {
  //   'example-dynamic-form': {
  //     modulePath: () =>
  //       import('@uqt/examples/dynamic-form').then(
  //         m => m.WebExamplesDynamicFormModule
  //       ),
  //     moduleRef: null
  //   }
  // };

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  // private componentRegistry = {
  //   'example-dynamic-form': {
  //     modulePath: () =>
  //       import('@uqt/examples/dynamic-form').then(
  //         m => m.WebExamplesDynamicFormModule
  //       ),
  //     moduleRef: null
  //   }
  // };

  // loadComponent(componentTag: string): Promise<HTMLElement> {
  //   const cmpRegistryEntry = this.componentRegistry[componentTag];
  //   if (!cmpRegistryEntry) {
  //     throw new Error(
  //       `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
  //     );
  //   }

  //   if (cmpRegistryEntry.moduleRef) {
  //     return new Promise(resolve => {
  //       const componentInstance = document.createElement(componentTag);
  //       resolve(componentInstance);
  //     });
  //   } else {
  //     const path = cmpRegistryEntry.modulePath;

  //     return new Promise((resolve, reject) => {
  //       (path() as Promise<NgModuleFactory<any> | Type<any>>)
  //         .then(elementModuleOrFactory => {
  //           if (elementModuleOrFactory instanceof NgModuleFactory) {
  //             // if ViewEngine
  //             return elementModuleOrFactory;
  //           } else {
  //             // if Ivy
  //             return this.compiler.compileModuleAsync(elementModuleOrFactory);
  //           }
  //         })
  //         .then(moduleFactory => {
  //           const moduleRef = moduleFactory.create(this.injector).instance;
  //           cmpRegistryEntry.moduleRef = moduleRef;

  //           // instantiate the component
  //           const componentInstance = document.createElement(componentTag);
  //           resolve(componentInstance);
  //         })
  //         .catch(err => {
  //           console.error('error loading module', err);
  //           reject(err);
  //         });
  //     });
  //   }
  // }

  loadComponent(componentTag: string): Promise<ComponentFactory<any>> {
    // const cmpRegistryEntry = this.componentRegistry[componentTag];
    const cmpRegistryEntry = this.getRegisteredModule(componentTag);

    if (!cmpRegistryEntry) {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }

    if (cmpRegistryEntry.moduleRef) {
      return new Promise(resolve => {
        // const componentInstance = document.createElement(componentTag);
        const componentFactory = this.resolver.resolveComponentFactory(
          cmpRegistryEntry.entryComponent
        );
        resolve(componentFactory);
      });
    } else {
      const path = cmpRegistryEntry.modulePath;

      return new Promise((resolve, reject) => {
        (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModuleOrFactory => {
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              // if ViewEngine
              return elementModuleOrFactory;
            } else {
              // if Ivy
              return this.compiler.compileModuleAsync(elementModuleOrFactory);
            }
          })
          .then(moduleFactory => {
            const moduleRef = moduleFactory.create(this.injector).instance;
            cmpRegistryEntry.moduleRef = moduleRef;

            const componentFactory = this.resolver.resolveComponentFactory(
              cmpRegistryEntry.entryComponent
            );
            resolve(componentFactory);
          })
          .catch(err => {
            console.error('error loading module', err);
            reject(err);
          });
      });
    }
  }
}
