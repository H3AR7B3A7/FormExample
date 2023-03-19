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
  savingPatient: undefined,
  currentPatient: undefined,
}

export const patientFormReducer = createReducer<PatientFormState>(
  initialState,
  on(
    PatientFormPageActions.setCurrentPatient,
    (state, action): PatientFormState => {
      return {
        ...state,
        currentPatient: action.id,
      }
    }
  ),
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
      savingPatient: true,
    }
  }),
  on(
    PatientFormApiActions.addPatientSuccess,
    (state, action): PatientFormState => {
      return {
        ...state,
        patients: [...state.patients, action.patient],
        errorMessage: '',
        savingPatient: false,
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
  ),
  on(
    PatientFormApiActions.removePatientSuccess,
    (state, action): PatientFormState => {
      return {
        ...state,
        patients: state.patients.filter((p) => action.id !== p.id),
        errorMessage: '',
      }
    }
  ),
  on(
    PatientFormApiActions.removePatientFail,
    (state, action): PatientFormState => {
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    }
  )
)
