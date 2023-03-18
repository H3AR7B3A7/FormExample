import { Component, OnInit } from '@angular/core'
import { Patient } from '@app/patient-form/patient'
import {
  addPatient,
  loadPatients,
} from '@app/patient-form/state/actions/patient-form-page.actions'
import {
  selectPatients,
  selectPatientsErrorMessage,
  selectPatientsLoading,
} from '@app/patient-form/state/patient-form.selector'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  patients$!: Observable<Patient[]>
  errorMessage$!: Observable<string>
  loading$!: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.patients$ = this.store.select(selectPatients)
    this.errorMessage$ = this.store.select(selectPatientsErrorMessage)
    this.loading$ = this.store.select(selectPatientsLoading)
    this.store.dispatch(loadPatients())
  }

  addPatient($event: Patient): void {
    this.store.dispatch(addPatient({ patient: $event }))
  }
}
