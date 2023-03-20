import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NonNullableFormBuilder } from '@angular/forms'
import { Utils } from '@app/patient-form/patient-form-edit/utils/utils'

@Component({
  selector: 'app-circular-calc-form',
  templateUrl: './circular-calc-form.component.html',
  styleUrls: ['./circular-calc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularCalcFormComponent {
  readonly calcForm = this.fb.group({
    a: [''],
    b: [''],
    c: [''],
  })

  readonly fc = Utils.getControls(this.calcForm)

  constructor(private fb: NonNullableFormBuilder) {}

  onSubmit(): void {
    console.log(this.calcForm.value)
  }

  calculateC(): void {
    const c = +this.fc.a.value + +this.fc.b.value
    this.calcForm.patchValue({ c: '' + c })
  }

  calculateB(): void {
    const b = +this.fc.c.value - +this.fc.a.value
    this.calcForm.patchValue({ b: '' + b })
  }
}
