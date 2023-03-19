import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { GENDERS } from '@app/patient-form/models/gender'
import {
  NEW_PATIENT,
  Patient,
  resolvePatient,
} from '@app/patient-form/models/patient'
import { PatientIdValidator } from '@app/patient-form/patient-form-edit/utils/patient-id-validator'
import { Utils } from '@app/patient-form/patient-form-edit/utils/utils'

@Component({
  selector: 'app-patient-form-edit',
  templateUrl: './patient-form-edit.component.html',
  styleUrls: ['./patient-form-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormEditComponent {
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

  readonly fc = Utils.getControls(this.patientForm)

  formTitle = 'Add Patient'
  buttonText = 'Add'
  readonly genders = GENDERS
  private _savingPatient: boolean | undefined

  @Input()
  set savingPatient(saving: boolean | undefined) {
    if (!saving) {
      this.patientForm.reset(NEW_PATIENT)
      this.patientForm.controls.notes.clear()
    }
    this._savingPatient = saving
  }

  get savingPatient(): boolean | undefined {
    return this._savingPatient
  }

  @Input()
  set currentPatient(patient: Patient | undefined) {
    this.displayPatient(patient)
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

  private displayPatient(patient: Patient | undefined): void {
    if (patient && patient?.patientId !== '') {
      this.patientForm.reset(NEW_PATIENT)
      this.patientForm.controls.notes.clear()

      if (patient.id === 0) {
        this.formTitle = 'Add Patient'
        this.buttonText = 'Add'
        this.fc.patientId.enable()
      } else {
        this.formTitle = `Edit Patient: ${patient.name.first} ${patient.name.last}`
        this.buttonText = 'Edit'
        this.fc.patientId.disable()
      }

      patient.notes.forEach(() => {
        this.addNote()
      })

      this.patientForm.patchValue({
        patientId: patient.patientId,
        name: {
          first: patient.name.first,
          last: patient.name.last,
        },
        age: patient.age,
        gender: patient.gender,
        address: {
          street: patient.address.street,
          number: patient.address.number,
          city: patient.address.city,
        },
        notes: patient.notes.length > 0 ? patient.notes : [],
      })
    }
  }
}
