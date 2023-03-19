import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Patient } from '@app/patient-form/models/patient'
import {
  addPatient,
  loadPatients,
  removePatient,
  setCurrentPatient,
  updatePatient,
} from '@app/patient-form/state/actions/patient-form-page.actions'
import { selectPatientFormVM } from '@app/patient-form/state/patient-form.selector'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormComponent implements OnInit {
  vm$!: Observable<{
    patients: Patient[]
    currentPatientId: number
    currentPatient: Patient
    errorMessage: string
    loading: boolean
    savingPatient: boolean
    updatingPatient: boolean
    removingPatient: number
  }>
  // patients$!: Observable<Patient[]>
  // errorMessage$!: Observable<string>
  // loading$!: Observable<boolean>
  // patientAdded$!: Observable<boolean>
  // ...

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.vm$ = this.store.select(selectPatientFormVM)
    // this.patients$ = this.store.select(selectPatients)
    // this.errorMessage$ = this.store.select(selectPatientsErrorMessage)
    // this.loading$ = this.store.select(selectPatientsLoading)
    // this.patientAdded$ = this.store.select(selectPatientAdded)
    // ...
    this.store.dispatch(loadPatients())
  }

  patientSelected(id: number): void {
    this.store.dispatch(setCurrentPatient({ id }))
  }

  addPatient(patient: Patient): void {
    if (!patient.id) {
      this.store.dispatch(addPatient({ patient }))
    } else {
      this.store.dispatch(updatePatient({ patient }))
    }
  }

  removePatient(id: number): void {
    this.store.dispatch(removePatient({ id }))
  }
}
