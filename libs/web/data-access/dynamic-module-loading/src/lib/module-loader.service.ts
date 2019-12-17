import {
  Injectable,
  Injector,
  Type,
  Compiler,
  ComponentFactory,
  NgModuleFactory,
  InjectionToken,
  Inject
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged, take } from 'rxjs/operators';

export type TModuleImportPath = () => Promise<NgModuleFactory<any> | Type<any>>;

interface IModuleRegistry {
  importPath: TModuleImportPath;
  loadInitiated: boolean;
  loadComplete: boolean;
}

interface IFactoryRegistry {
  [key: string]: { factory: ComponentFactory<any> } | undefined;
}

export interface ILazyModuleRegistry {
  [key: string]: TModuleImportPath;
}

export const LAZY_MODULE_REGISTRY = new InjectionToken<ILazyModuleRegistry>(
  'LAZY_MODULE_REGISTRY'
);

@Injectable({
  providedIn: 'root'
})
export class ModuleLoaderService {
  private _registry: Map<string, IModuleRegistry> = new Map();
  private registry: BehaviorSubject<IFactoryRegistry> = new BehaviorSubject({});

  private registry$ = this.registry.asObservable();

  /**
   * TODO -> Investigate what the 'Compiler' is that is imported from '@angular/core'
   * It is not the 'angular/compiler' however, in AOT compilation is not bundled unless we import it?
   * It might be unnecessarily the Compiler... investigate further
   */
  constructor(
    @Inject(LAZY_MODULE_REGISTRY)
    _lazyModuleRegistry: ILazyModuleRegistry,
    private compiler: Compiler,
    private injector: Injector
  ) {
    // Register the providers in the internal map
    this._registerModule(_lazyModuleRegistry);
  }

  selectFactory(tag: string): Observable<ComponentFactory<any> | undefined> {
    return this.registry$.pipe(
      map(registry => registry[tag]),
      distinctUntilChanged(),
      map(module => (module && module.factory ? module.factory : undefined))
    );
  }

  private _registerModule(modules: ILazyModuleRegistry): void {
    Object.keys(modules).forEach(key => {
      const moduleRegister: IModuleRegistry = {
        importPath: modules[key],
        loadComplete: false,
        loadInitiated: false
      };
      this._registry.set(key, moduleRegister);
    });
  }

  public async initLoadModule(key: string): Promise<boolean> {
    const registeredModule = this._registry.get(key);

    if (!registeredModule) {
      throw new Error(
        `Unrecognized component "${key}". Make sure it is registered in the component registry`
      );
    }

    // Only initiate the import if it has not already
    if (!registeredModule.loadInitiated) {
      registeredModule.loadInitiated = true;

      const path = registeredModule.importPath;

      try {
        const elementModule = await path();
        let moduleFactory: NgModuleFactory<any>;

        if (elementModule instanceof NgModuleFactory) {
          // AOT Compilation
          moduleFactory = elementModule;
        } else {
          // JIT Compilation
          moduleFactory = await this.compiler.compileModuleAsync(elementModule);
        }

        const entryComponent = (<any>moduleFactory.moduleType)
          .lazyEntryComponent;

        if (!entryComponent) {
          throw new Error(
            `No entry component defined. a static 'lazyEntryComponent' must be defined on ${moduleFactory.moduleType}`
          );
        }

        const moduleRef = moduleFactory.create(this.injector);

        const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(
          entryComponent
        );

        registeredModule.loadComplete = true;
        this.registerFactory(key, factory);
        return true;
      } catch (err) {
        console.error('error loading module', err);
        return false;
      }
    } else {
      return true;
    }
  }

  private registerFactory(key: string, factory: ComponentFactory<any>) {
    this.registry$.pipe(take(1)).subscribe(registry => {
      const registryClone = { ...registry };
      registryClone[key] = { factory };
      this.registry.next(registryClone);
    });
  }
}
