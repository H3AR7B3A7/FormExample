import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NonNullableFormBuilder } from '@angular/forms'
import { FormGroupUtils } from '@app/patient-form/patient-form-edit/utils/formGroupUtils'

@Component({
  selector: 'app-circular-calc-form',
  templateUrl: './circular-calc-form.component.html',
  styleUrls: ['./circular-calc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularCalcFormComponent {
  readonly calcForm = this.fb.group({
    a: [NaN],
    b: [NaN],
    c: [NaN],
  })

  readonly fc = FormGroupUtils.getFlattenedControls(this.calcForm)

  constructor(private fb: NonNullableFormBuilder) {}

  onSubmit(): void {
    console.log(this.calcForm.value)
  }

  calculateC(): void {
    const c = (this.fc.a.value || 0) + (this.fc.b.value || 0)
    this.calcForm.patchValue({ c })
  }

  calculateB(): void {
    const b = (this.fc.c.value || 0) - (this.fc.a.value || 0)
    this.calcForm.patchValue({ b })
  }
}
