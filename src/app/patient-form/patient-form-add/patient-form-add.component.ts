import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Patient, resolvePatient } from '@app/patient-form/patient'
import { GENDERS } from '@app/patient-form/patient-form-add/gender'
import { PatientIdValidator } from '@app/patient-form/patient-form-add/utils/patient-id-validator'
import { Observable, skip } from 'rxjs'

@Component({
  selector: 'app-patient-form-add',
  templateUrl: './patient-form-add.component.html',
  styleUrls: ['./patient-form-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormAddComponent implements OnInit {
  patientForm = this.fb.group({
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

  readonly genders = GENDERS

  @Input()
  patientAdded$!: Observable<boolean>

  @Output()
  private readonly patient = new EventEmitter<Patient>()

  constructor(
    private fb: FormBuilder,
    private patientIdValidator: PatientIdValidator
  ) {}

  ngOnInit(): void {
    this.patientAdded$.pipe(skip(1)).subscribe((added) => {
      if (added) {
        this.patientForm.reset()
      }
    })
  }

  get patientId(): FormControl {
    return this.patientForm.controls.patientId
  }

  get first(): FormControl {
    return this.patientForm.controls.name.controls.first
  }

  get last(): FormControl {
    return this.patientForm.controls.name.controls.last
  }

  get age(): FormControl {
    return this.patientForm.controls.age
  }

  get gender(): FormControl {
    return this.patientForm.controls.gender
  }

  get street(): FormControl {
    return this.patientForm.controls.address.controls.street
  }

  get number(): FormControl {
    return this.patientForm.controls.address.controls.number
  }

  get city(): FormControl {
    return this.patientForm.controls.address.controls.city
  }

  noteAt(i: number): FormControl {
    return this.patientForm.controls.notes.controls[i].controls.text
  }

  check(formControl: FormControl, error: string): boolean {
    return (
      (formControl.dirty || formControl.touched) && formControl.hasError(error)
    )
  }

  onSubmit(): void {
    const value = this.patientForm.value
    this.patient.emit(resolvePatient(value))
  }

  removeNote(i: number): void {
    this.patientForm.controls.notes.removeAt(i)
  }

  addNote(): void {
    this.patientForm.controls.notes.push(this.buildNote())
  }

  private buildNote(): FormGroup<{ text: FormControl<string | null> }> {
    return this.fb.group({
      text: ['', [Validators.required]],
    })
  }
}
