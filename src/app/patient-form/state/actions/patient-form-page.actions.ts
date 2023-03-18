import { Patient } from '@app/patient-form/patient'
import { createAction, props } from '@ngrx/store'

export const loadPatients = createAction('[PatientsForm Page] Load')

export const addPatient = createAction(
  '[PatientsForm Page] Add Patient',
  props<{ patient: Patient }>()
)
