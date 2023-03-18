import { PatientFormState } from '@app/patient-form/state/patient-form.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectClientFeatureState =
  createFeatureSelector<PatientFormState>('patientForm')
export const selectPatients = createSelector(
  selectClientFeatureState,
  (state) => state.patients
)

export const selectPatientsErrorMessage = createSelector(
  selectClientFeatureState,
  (state) => state.errorMessage
)

export const selectPatientsLoading = createSelector(
  selectClientFeatureState,
  (state) => state.loading
)
