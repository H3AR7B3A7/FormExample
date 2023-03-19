import { NEW_PATIENT } from '@app/patient-form/models/patient'
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
  (state) => state.savingPatient
)

export const selectCurrentPatientId = createSelector(
  selectPatientFormFeatureState,
  (state) => state.currentPatient
)

export const selectCurrentPatient = createSelector(
  selectPatientFormFeatureState,
  selectCurrentPatientId,
  (state, currentPatientId) => {
    if (!currentPatientId) {
      return NEW_PATIENT
    } else {
      return currentPatientId
        ? state.patients.find((p) => p.id === currentPatientId)
        : undefined
    }
  }
)

export const selectPatientFormVM = createSelector(
  selectPatients,
  selectCurrentPatientId,
  selectCurrentPatient,
  selectPatientsErrorMessage,
  selectPatientsLoading,
  selectPatientAdded,
  (
    patients,
    currentPatientId,
    currentPatient,
    errorMessage,
    loading,
    savingPatient
  ) => ({
    patients,
    currentPatientId,
    currentPatient,
    errorMessage,
    loading,
    savingPatient,
  })
)
