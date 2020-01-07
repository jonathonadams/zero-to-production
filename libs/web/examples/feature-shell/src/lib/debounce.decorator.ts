export function Debounce(delay: number = 300): MethodDecorator {
  return function(
    target: any,
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    const key = Symbol(`__timeout__${propertyKey}`);

    descriptor.value = function(...args: any[]) {
      clearTimeout((this as any)[key]);
      (this as any)[key] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
