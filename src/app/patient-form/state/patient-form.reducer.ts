import {
  PatientFormApiActions,
  PatientFormPageActions,
} from '@app/patient-form/state/actions'
import { createReducer, on } from '@ngrx/store'

import { PatientFormState } from './patient-form.state'

export const initialState: PatientFormState = {
  patients: [],
  errorMessage: '',
  loading: true,
  patientAdded: true,
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
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
  ),
  on(PatientFormPageActions.addPatient, (state): PatientFormState => {
    return {
      ...state,
      patientAdded: false,
    }
  }),
  on(
    PatientFormApiActions.addPatientSuccess,
    (state, action): PatientFormState => {
      return {
        ...state,
        patients: [...state.patients, action.patient],
        errorMessage: '',
        patientAdded: true,
      }
    }
  ),
  on(
    PatientFormApiActions.addPatientFail,
    (state, action): PatientFormState => {
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    }
  )
)
