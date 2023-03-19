import {
  PatientFormApiActions,
  PatientFormPageActions,
} from '@app/patient-form/state/actions'
import { createReducer, on } from '@ngrx/store'

import { PatientFormState } from './patient-form.state'

export const initialState: PatientFormState = {
  patients: [],
  currentPatientId: 0,
  errorMessage: '',
  loading: true,
  savingPatient: false,
  updatingPatient: false,
  removingPatient: 0,
}

export const patientFormReducer = createReducer<PatientFormState>(
  initialState,
  on(
    PatientFormPageActions.setCurrentPatient,
    (state, action): PatientFormState => {
      return {
        ...state,
        currentPatientId: action.id,
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
        savingPatient: false,
      }
    }
  ),
  on(PatientFormPageActions.updatePatient, (state): PatientFormState => {
    return {
      ...state,
      updatingPatient: true,
    }
  }),
  on(
    PatientFormApiActions.updatePatientSuccess,
    (state, action): PatientFormState => {
      const updatedPatients = state.patients.map((p) =>
        action.patient.id === p.id ? action.patient : p
      )
      return {
        ...state,
        patients: updatedPatients,
        currentPatientId: 0,
        errorMessage: '',
        updatingPatient: false,
      }
    }
  ),
  on(
    PatientFormApiActions.updatePatientFail,
    (state, action): PatientFormState => {
      return {
        ...state,
        currentPatientId: 0,
        errorMessage: action.errorMessage,
        updatingPatient: false,
      }
    }
  ),
  on(
    PatientFormPageActions.removePatient,
    (state, action): PatientFormState => {
      return {
        ...state,
        removingPatient: action.id,
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
        removingPatient: 0,
      }
    }
  ),
  on(
    PatientFormApiActions.removePatientFail,
    (state, action): PatientFormState => {
      return {
        ...state,
        errorMessage: action.errorMessage,
        removingPatient: 0,
      }
    }
  )
)
