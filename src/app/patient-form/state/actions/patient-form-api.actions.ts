import { Patient } from '@app/patient-form/patient'
import { createAction, props } from '@ngrx/store'

// LOAD OPERATIONS

export const loadPatientsSuccess = createAction(
  '[Patient API] Load Success',
  props<{ patients: Patient[] }>()
)

export const loadPatientsFail = createAction(
  '[Patient API] Load Fail',
  props<{ errorMessage: string }>()
)

// CREATE OPERATIONS

export const addPatientSuccess = createAction(
  '[PatientForm API] Add Patient Success',
  props<{ patient: Patient }>()
)

export const addPatientFail = createAction(
  '[PatientForm API] Add Patient Fail',
  props<{ errorMessage: string }>()
)

// DELETE OPERATIONS

export const removePatientSuccess = createAction(
  '[PatientForm API] Remove Patient Success',
  props<{ id: number }>()
)

export const removePatientFail = createAction(
  '[PatientForm API] Remove Patient Fail',
  props<{ errorMessage: string }>()
)
