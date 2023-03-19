import { Patient } from '@app/patient-form/model/patient'
import { createAction, props } from '@ngrx/store'

export const loadPatients = createAction('[PatientsForm Page] Load')

export const setCurrentPatient = createAction(
  '[PatientForm Page] Set Current Patient',
  props<{ id: number }>()
)

export const addPatient = createAction(
  '[PatientsForm Page] Add Patient',
  props<{ patient: Patient }>()
)

export const updatePatient = createAction(
  '[PatientForm Page] Update Patient',
  props<{ patient: Patient }>()
)

export const removePatient = createAction(
  '[PatientsForm Page] Remove Patient',
  props<{ id: number }>()
)
