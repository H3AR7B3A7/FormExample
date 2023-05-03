export const nonNullable = <T extends object>(obj: object): obj is T =>
  Object.values(obj).every((value) => value !== null)
