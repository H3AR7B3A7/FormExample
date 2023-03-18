import { Patient } from '@app/patient-form/patient'
import { createAction, props } from '@ngrx/store'

// LOAD OPERATIONS
export const loadPatientsSuccess = createAction(
  '[Patient API] Load Success',
  props<{ patients: Patient[] }>()
)

export const loadPatientsFail = createAction(
  '[Patient API] Load Fail',
  props<{ error: string }>()
)
