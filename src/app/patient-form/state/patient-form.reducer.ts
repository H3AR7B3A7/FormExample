import { PatientFormApiActions } from '@app/patient-form/state/actions'
import { createReducer, on } from '@ngrx/store'

import { PatientFormState } from './patient-form.state'

export const initialState: PatientFormState = {
  patients: [],
  errorMessage: '',
  loading: false,
}

export const patientFormReducer = createReducer<PatientFormState>(
  initialState,
  on(
    PatientFormApiActions.loadPatientsSuccess,
    (state, action): PatientFormState => {
      return {
        ...state,
        patients: action.patients,
        errorMessage: '',
        loading: false,
      }
    }
  ),
  on(
    PatientFormApiActions.loadPatientsFail,
    (state, action): PatientFormState => {
      return {
        ...state,
        patients: [],
        errorMessage: action.error,
        loading: false,
      }
    }
  )
)
