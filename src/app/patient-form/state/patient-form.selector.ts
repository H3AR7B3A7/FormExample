import { NEW_PATIENT, Patient } from '@app/patient-form/model/patient'
import { PatientFormState } from '@app/patient-form/state/patient-form.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectPatientFormFeatureState =
  createFeatureSelector<PatientFormState>('patientForm')

// export const selectPatients = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.patients
// )
//
// export const selectPatientsErrorMessage = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.errorMessage
// )
//
// export const selectPatientsLoading = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.loading
// )
//
// export const selectSavingPatient = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.savingPatient
// )
//
// export const selectUpdatingPatient = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.updatingPatient
// )
//
// export const selectCurrentPatientId = createSelector(
//   selectPatientFormFeatureState,
//   (state) => state.currentPatient
// )

export const selectCurrentPatient = createSelector(
  selectPatientFormFeatureState,
  (state) => {
    if (state.currentPatientId === 0) {
      return NEW_PATIENT
    } else {
      return state.currentPatientId
        ? (state.patients
            .map((p) => p)
            .find((p) => p.id === state.currentPatientId) as Patient)
        : NEW_PATIENT
    }
  }
)

export const selectPatientFormVM = createSelector(
  selectPatientFormFeatureState,
  selectCurrentPatient,
  (state, currentPatient) => ({ ...state, currentPatient })
)
