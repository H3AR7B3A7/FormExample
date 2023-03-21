import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms'

type FlattenedFormControls<T> = {
  [K in keyof T]: T[K] extends FormGroup
    ? FlattenedFormControls<T[K]['controls']>
    : T[K] extends FormArray
    ? FormArray
    : T[K]
}

export class FormGroupUtils {
  static getFlattenedControls<T extends { [key: string]: AbstractControl }>(
    formGroup: FormGroup<T>
  ): FlattenedFormControls<T> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const flattenedControls: any = {}
    for (const [key, control] of Object.entries(formGroup.controls)) {
      if (
        control instanceof FormControl ||
        (control instanceof FormArray && control.controls.length > 0)
      ) {
        flattenedControls[key] = control
      }
      if (control instanceof FormGroup) {
        flattenedControls[key] = FormGroupUtils.getFlattenedControls(control)
      }
    }
    return flattenedControls
  }
}
