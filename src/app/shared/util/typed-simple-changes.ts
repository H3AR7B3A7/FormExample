type MarkFunctionProperties<Component> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof Component]: Component[Key] extends Function ? never : Key
}

type ExcludeFunctionPropertyNames<T> = MarkFunctionProperties<T>[keyof T]

type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>

export type TypedSimpleChanges<
  Component,
  Props = ExcludeFunctions<Component>
> = {
  [Key in keyof Props]: {
    previousValue: Props[Key]
    currentValue: Props[Key]
    firstChange: boolean
    isFirstChange(): boolean
  }
}

// Workaround for tests:
// const changes: NgChanges<SomeComponent> = {} as any;
// changes.something = new SimpleChange(null, someData, true);
// component.ngOnChanges(changes);
