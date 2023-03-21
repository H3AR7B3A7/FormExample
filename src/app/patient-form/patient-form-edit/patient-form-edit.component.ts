import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { GENDERS } from '@app/patient-form/model/gender'
import {
  NEW_PATIENT,
  Patient,
  resolvePatient,
} from '@app/patient-form/model/patient'
import { PatientIdValidator } from '@app/patient-form/patient-form-edit/utils/patient-id-validator'
import { FormGroupUtils } from '@app/shared/util/form-group-utils'
import { TypedSimpleChanges } from '@app/shared/util/typed-simple-changes'

@Component({
  selector: 'app-patient-form-edit',
  templateUrl: './patient-form-edit.component.html',
  styleUrls: ['./patient-form-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormEditComponent implements OnChanges {
  @Input()
  savingPatient!: boolean
  @Input()
  currentPatient!: Patient
  @Output()
  private readonly patient = new EventEmitter<Patient>()

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
    age: [NaN, [Validators.required, Validators.min(0)]],
    gender: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
    notes: this.fb.array([this.buildNote()]),
  })

  readonly fc = FormGroupUtils.getFlattenedControls(this.patientForm)
  readonly genders = GENDERS
  formTitle = 'Add Patient'
  buttonText = 'Add'

  constructor(
    private fb: FormBuilder,
    private patientIdValidator: PatientIdValidator
  ) {}

  ngOnChanges(sc: TypedSimpleChanges<PatientFormEditComponent>): void {
    if (!sc.savingPatient?.currentValue && !sc.savingPatient?.firstChange) {
      this.patientForm.reset(NEW_PATIENT)
      this.patientForm.controls.notes.clear()
    }
    if (!sc.savingPatient?.firstChange) {
      this.displayPatient(sc.currentPatient.currentValue)
    }
  }

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
    this.patient.emit(
      this.currentPatient.id === 0
        ? resolvePatient(this.patientForm.value)
        : resolvePatient({
            ...this.currentPatient,
            ...this.patientForm.value,
          })
    )
  }

  private displayPatient(patient: Patient): void {
    this.patientForm.controls.notes.clear()
    if (patient.id === 0) {
      this.patientForm.reset(NEW_PATIENT)
      this.formTitle = 'Add Patient'
      this.buttonText = 'Add'
      this.fc.patientId.enable()
    } else {
      patient.notes.forEach(() => {
        this.addNote()
      })
      this.formTitle = `Edit Patient: ${patient.name.first} ${patient.name.last}`
      this.buttonText = 'Edit'
      this.fc.patientId.disable()
      this.patientForm.patchValue(patient)
    }
  }
}
