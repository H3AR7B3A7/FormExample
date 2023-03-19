import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms'

type FlattenFormControls<T> = {
  [K in keyof T]: T[K] extends FormGroup<infer R>
    ? FlattenFormControls<R>
    : T[K] extends FormArray<infer U>
    ? FlattenFormControls<U>[]
    : T[K] extends FormControl
    ? T[K]
    : never
}

export class Utils {
  static getControls<T extends { [key: string]: AbstractControl }>(
    formGroup: FormGroup<T>
  ): FlattenFormControls<T> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const flattenedControls: any = {}

    for (const controlName in formGroup.controls) {
      if (
        Object.prototype.hasOwnProperty.call(formGroup.controls, controlName)
      ) {
        const control = formGroup.controls[controlName]

        if (control instanceof FormControl) {
          flattenedControls[controlName] = control
        } else if (control instanceof FormGroup) {
          flattenedControls[controlName] = Utils.getControls(control)
        } else if (control instanceof FormArray) {
          if (control.controls.length > 0) {
            if (control.controls[0] instanceof FormGroup) {
              flattenedControls[controlName] = control.controls.map((c) => {
                if (c instanceof FormGroup) {
                  return Utils.getControls(c)
                } else {
                  return c
                }
              })
            }
          }
        }
      }
    }

    return flattenedControls
  }
}
