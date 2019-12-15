import {
  Injectable,
  Injector,
  Type,
  Compiler,
  ComponentFactory,
  NgModuleFactory
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, distinctUntilChanged, take } from 'rxjs/operators';

export type TModuleImportPath = () => Promise<Type<any>>;

interface IModuleRegistry {
  importPath: () => Promise<Type<any>>;
  loadInitiated: boolean;
  loadComplete: boolean;
}

interface IFactoryRegistry {
  [key: string]: { factory: ComponentFactory<any> } | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleLoaderService {
  private _registry: Map<string, IModuleRegistry> = new Map();
  private registry: BehaviorSubject<IFactoryRegistry> = new BehaviorSubject({});

  private registry$ = this.registry.asObservable();

  constructor(private compiler: Compiler, private injector: Injector) {}

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.registry$.pipe(
      map(registry => registry[tag]),
      // Trigger load if it there is not once currently in the observable store
      // Note that this might be triggerd multiple times, but the import will only be
      // called once
      tap(module => (!module ? this.loadComponent(tag) : undefined)),
      distinctUntilChanged(),
      map(module => (module && module.factory ? module.factory : undefined))
    );
  }

  registerModule(key: string, moduleImportPath: TModuleImportPath): void {
    const moduleRegister: IModuleRegistry = {
      importPath: moduleImportPath,
      loadComplete: false,
      loadInitiated: false
    };
    this._registry.set(key, moduleRegister);
  }

  private loadComponent(componentTag: string): Promise<boolean> | null {
    const registeredModule = this._registry.get(componentTag);

    if (!registeredModule) {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }

    // Only initiate the import if it has not already
    if (!registeredModule.loadInitiated) {
      registeredModule.loadInitiated = true;

      const path = registeredModule.importPath;

      return new Promise((resolve, reject) => {
        return (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModule => {
            if (elementModule instanceof NgModuleFactory) {
              // TODO -> investigate this further
              throw new Error('Must be run with AOT');
            } else {
              try {
                return this.compiler.compileModuleAndAllComponentsAsync(
                  elementModule
                );
              } catch (err) {
                throw err;
              }
            }
          })
          .then(moduleWithComponentFactory => {
            const moduleRef = moduleWithComponentFactory.ngModuleFactory.create(
              this.injector
            );

            const factory = moduleWithComponentFactory.componentFactories[0];

            registeredModule.loadComplete = true;
            this.registerFactory(componentTag, factory);

            resolve(true);
          })
          .catch(err => {
            console.error('error loading module', err);
            reject(err);
          });
      });
    } else {
      return null;
    }
  }

  private registerFactory(tag: string, factory: ComponentFactory<any>) {
    this.registry$.pipe(take(1)).subscribe(registry => {
      const registryClone = { ...registry };
      registryClone[tag] = { factory };
      this.registry.next(registryClone);
    });
  }
}
