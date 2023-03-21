import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms'

type FlattenedFormControls<T> = T extends { [key: string]: AbstractControl }
  ? {
      [K in keyof T]: T[K] extends FormGroup
        ? FlattenedFormControls<T[K]['controls']>
        : T[K]
    }
  : never

export class FormGroupUtils {
  static getFlattenedControls<T extends { [key: string]: AbstractControl }>(
    formGroup: FormGroup<T>
  ): FlattenedFormControls<T> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const flattenedControls: any = {}
    for (const [key, control] of Object.entries(formGroup.controls)) {
      if (control instanceof FormControl) {
        flattenedControls[key] = control
      }
      if (control instanceof FormGroup) {
        flattenedControls[key] = FormGroupUtils.getFlattenedControls(control)
      }
      if (control instanceof FormArray && control.controls.length > 0) {
        flattenedControls[key] = control.controls.map((c) => {
          if (c instanceof FormGroup) {
            return FormGroupUtils.getFlattenedControls(c)
          }
          return c
        })
      }
    }
    return flattenedControls
  }
}
