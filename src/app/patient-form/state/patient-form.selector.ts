import { PatientFormState } from '@app/patient-form/state/patient-form.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectPatientFormFeatureState =
  createFeatureSelector<PatientFormState>('patientForm')
export const selectPatients = createSelector(
  selectPatientFormFeatureState,
  (state) => state.patients
)

export const selectPatientsErrorMessage = createSelector(
  selectPatientFormFeatureState,
  (state) => state.errorMessage
)

export const selectPatientsLoading = createSelector(
  selectPatientFormFeatureState,
  (state) => state.loading
)

export const selectPatientAdded = createSelector(
  selectPatientFormFeatureState,
  (state) => state.patientAdded
)

export const selectOverviewVM = createSelector(
  selectPatients,
  selectPatientsErrorMessage,
  selectPatientsLoading,
  (patients, errorMessage, loading) => ({
    patients,
    errorMessage,
    loading,
  })
)
