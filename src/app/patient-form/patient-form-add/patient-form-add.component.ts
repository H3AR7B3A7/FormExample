import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { GENDERS } from '@app/patient-form/models/gender'
import { Patient, resolvePatient } from '@app/patient-form/models/patient'
import { PatientIdValidator } from '@app/patient-form/patient-form-add/utils/patient-id-validator'
import { Utils } from '@app/patient-form/patient-form-add/utils/utils'

@Component({
  selector: 'app-patient-form-add',
  templateUrl: './patient-form-add.component.html',
  styleUrls: ['./patient-form-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormAddComponent {
  readonly patientForm = this.fb.group({
    patientId: [
      '',
      Validators.required,
      this.patientIdValidator.validate.bind(this.patientIdValidator),
    ],
    name: this.fb.group({
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
    }),
    age: [null, [Validators.required, Validators.min(0)]],
    gender: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
    notes: this.fb.array([this.buildNote()]),
  })

  readonly fc = Utils.getControls(this.patientForm)

  readonly genders = GENDERS
  private _patientAdded = false

  @Input()
  set patientAdded(added: boolean) {
    if (added) {
      this.patientForm.reset()
    }
    this._patientAdded = added
  }

  get patientAdded(): boolean {
    return this._patientAdded
  }

  @Output()
  private readonly patient = new EventEmitter<Patient>()

  constructor(
    private fb: FormBuilder,
    private patientIdValidator: PatientIdValidator
  ) {}

  noteAt(i: number): FormControl {
    return this.patientForm.controls.notes.controls[i].controls.text
  }

  validate(formControl: FormControl, error: string): boolean {
    return (
      (formControl.dirty || formControl.touched) && formControl.hasError(error)
    )
  }

  addNote(): void {
    this.patientForm.controls.notes.push(this.buildNote())
  }

  removeNote(i: number): void {
    this.patientForm.controls.notes.removeAt(i)
  }

  private buildNote(): FormGroup<{ text: FormControl<string | null> }> {
    return this.fb.group({
      text: ['', [Validators.required]],
    })
  }

  onSubmit(): void {
    this.patient.emit(resolvePatient(this.patientForm.value))
  }
}
